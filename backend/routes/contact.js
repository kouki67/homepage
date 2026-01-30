import express from 'express';

const router = express.Router();

const LINE_API_URL = 'https://api.line.me/v2/bot/message/push';
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateStore = new Map();

const getClientIp = (req) => {
	const forwarded = req.headers['x-forwarded-for'];
	if (typeof forwarded === 'string' && forwarded.length > 0) {
		return forwarded.split(',')[0].trim();
	}
	return req.ip || 'unknown';
};

const isRateLimited = (ip) => {
	const now = Date.now();
	const entry = rateStore.get(ip) || { count: 0, start: now };
	if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
		rateStore.set(ip, { count: 1, start: now });
		return false;
	}
	entry.count += 1;
	rateStore.set(ip, entry);
	return entry.count > RATE_LIMIT_MAX;
};

const isBlank = (value) => typeof value !== 'string' || value.trim().length === 0;

const safeTrim = (value, max) => value.trim().slice(0, max);

router.post('/', async (req, res) => {
	const ip = getClientIp(req);
	if (isRateLimited(ip)) {
		return res.status(429).json({ message: '送信回数が多いため、時間をおいてお試しください。' });
	}

	const {
		name,
		company,
		contact,
		message
	} = req.body || {};

	if ([name, company, contact, message].some(isBlank)) {
		return res.status(400).json({ message: '必須項目が未入力です。' });
	}

	const payload = {
		name: safeTrim(name, 80),
		company: safeTrim(company, 120),
		contact: safeTrim(contact, 120),
		message: safeTrim(message, 1000)
	};

	const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
	const targetId = process.env.LINE_TARGET_ID;

	if (!accessToken || !targetId) {
		return res.status(500).json({ message: '送信設定が未完了です。' });
	}

	const text = [
		'【お問い合わせ】',
		`会社名：${payload.company}`,
		`お名前：${payload.name}`,
		`連絡先：${payload.contact}`,
		'---',
		payload.message
	].join('\n');

	try {
		const response = await fetch(LINE_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				to: targetId,
				messages: [{ type: 'text', text }]
			})
		});

		if (!response.ok) {
			console.log(response);
			return res.status(502).json({ message: '送信に失敗しました。' });
		}

		return res.status(200).json({ message: '送信しました。' });
	} catch (error) {
		console.log(response);
		return res.status(502).json({ message: '送信に失敗しました。' });
	}
});

export default router;
