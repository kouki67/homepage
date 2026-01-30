<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
	company: '',
	name: '',
	contact: '',
	message: ''
});

const isSubmitting = ref(false);
const submitError = ref('');
const submitSuccess = ref('');

const handleSubmit = async () => {
	if (isSubmitting.value) return;
	submitError.value = '';
	submitSuccess.value = '';
	isSubmitting.value = true;

	try {
		const apiBase = 'https://kouki067.com/api';
		const response = await fetch(`${apiBase}/contact`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				company: form.company,
				name: form.name,
				contact: form.contact,
				message: form.message
			})
		});

		if (!response.ok) {
			const data = await response.json().catch(() => ({}));
			console.log(response);
			throw new Error(data.message || '送信に失敗しました。');
		}

		submitSuccess.value = '送信しました。確認後にご連絡します。';
		form.company = '';
		form.name = '';
		form.contact = '';
		form.message = '';
	} catch (error) {
		submitError.value = error?.message || '送信に失敗しました。';
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<template>
	<main class="page" id="top">
		<div class="page-inner">
		<section class="hero">
			<div class="hero-text">
				<p class="eyebrow">地元のお店・会社のための</p>
				<h2>毎日の仕事が、<span class="hero-line">少しずつ楽になる</span></h2>
				<p class="lead">
					「売上や在庫のまとめ」「報告書づくり」「発注」など、
					繰り返す作業を、わかりやすいしくみで支えます。
				</p>
				<div class="hero-actions">
					<a class="btn primary" href="#contact">相談してみる</a>
					<a class="btn ghost" href="#services">できることを見る</a>
				</div>
			</div>
			<div class="hero-card">
				<p class="card-title">こんな方に向いています</p>
				<ul>
					<li>地元のスーパーや小さなお店</li>
					<li>中小企業の社長さん・店長さん</li>
					<li>日々の業務に手いっぱいで、新しい仕組みを考える時間が取れない方</li>
				</ul>
			</div>
		</section>

		<section class="section" id="worries">
			<div class="section-head">
				<h3>よくある悩み</h3>
			</div>
			<div class="grid worries">
				<div class="panel">
					<span class="icon">📊</span>
					<h4>売上や在庫をまとめるのが大変</h4>
					<p>数字を集めるだけで時間がかかる。</p>
				</div>
				<div class="panel">
					<span class="icon">📝</span>
					<h4>報告書づくりが毎回しんどい</h4>
					<p>日報・週報・月報が後回しになる。</p>
				</div>
				<div class="panel">
					<span class="icon">🧾</span>
					<h4>発注のミスが心配</h4>
					<p>忙しいと見落としが出てしまう。</p>
				</div>
				<div class="panel">
					<span class="icon">⏱️</span>
					<h4>毎日の事務が積み重なる</h4>
					<p>小さな作業が積み重なって残業に。</p>
				</div>
			</div>
		</section>

		<section class="section" id="services">
			<div class="section-head">
				<h3>サービス内容</h3>
			</div>
			<div class="grid services">
				<div class="card">
					<h4>売上・在庫のまとめが自動で進む</h4>
					<p>数字を手で集める時間が減り、確認だけで済みます。</p>
				</div>
				<div class="card">
					<h4>日報・週報・月報がすぐ作れる</h4>
					<p>必要な数字や内容がまとまり、書く手間が減ります。</p>
				</div>
				<div class="card">
					<h4>発注の見落としが減る</h4>
					<p>足りないものに気づきやすくなります。</p>
				</div>
				<div class="card">
					<h4>LINE公式アカウントの運用が楽になる</h4>
					<p>設定や配信の流れを整え、続けやすくします。</p>
				</div>
				<div class="card">
					<h4>毎日・毎週の事務が軽くなる</h4>
					<p>同じ作業をくり返さずにすみます。</p>
				</div>
				<div class="card">
					<h4>導入後も見守りと改善</h4>
					<p>入れたままにせず、変化に合わせて整えます。</p>
				</div>
			</div>
		</section>

		<section class="section" id="flow">
			<div class="section-head">
				<h3>導入の流れ</h3>
				<p>初めてでも安心できるように、小さく始めます。</p>
			</div>
			<ol class="flow">
				<li class="panel flow-card">
					<span class="step">1</span>
					<div>
						<h4>相談</h4>
						<p>今の困りごとを聞きます。</p>
					</div>
				</li>
				<li class="panel flow-card">
					<span class="step">2</span>
					<div>
						<h4>整理</h4>
						<p>仕事の流れを一緒に整理し、日々の業務を楽にできるポイントを見つけます。</p>
					</div>
				</li>
				<li class="panel flow-card">
					<span class="step">3</span>
					<div>
						<h4>小さく導入</h4>
						<p>まずは一部だけ試して、安心して進めます。</p>
					</div>
				</li>
				<li class="panel flow-card">
					<span class="step">4</span>
					<div>
						<h4>改善</h4>
						<p>使ってみた声をもとに、より楽になるよう調整します。</p>
					</div>
				</li>
				<li class="panel flow-card">
					<span class="step">5</span>
					<div>
						<h4>継続</h4>
						<p>導入後も見守り、困ったときにすぐ対応します。</p>
					</div>
				</li>
			</ol>
		</section>

		<section class="section" id="pricing">
			<div class="section-head">
				<h3>料金について</h3>
			</div>
			<div class="pricing-stack">
				<div class="panel pricing-card">
					<h4>事前相談</h4>
					<p class="price">無料</p>
					<p>楽にしたい業務をお聞きし、どれくらい負担が減るかを分かりやすくお話しします。</p>
					<p>気になることがあれば、ちょっとしたことでも大丈夫です。</p>
					<a class="btn ghost pricing-cta" href="#contact">お問い合わせへ</a>
				</div>
				<div class="panel pricing-card">
					<h4>初期導入費（目安）</h4>
					<p class="price">50,000円 ～ 500,000円</p>
					<p>ヒアリング・整理／仕組み作成／初期設定・確認。</p>
					<p>小さな業務1つから対応できます。</p>
				</div>
				<div class="panel pricing-card">
					<h4>月額運用保守（目安）</h4>
					<p class="price">1店舗あたり 10,000円 ～ 50,000円</p>
					<p>不具合対応／設定調整／軽微な改善／ご相談。</p>
					<p>導入後も安心して使えるよう支えます。</p>
				</div>
				<div class="panel info-card">
					<h4>複数店舗・追加のご要望</h4>
					<p>複数店舗は共通部分をまとめてご提案できます。</p>
					<p>追加の業務は別途導入費としてご相談します。</p>
					<p>保守の範囲を無理に広げることはありません。</p>
				</div>
			</div>
			<p class="note">金額は目安です。内容を伺った上で、無理のない形でご提案します。</p>
		</section>

		<section class="section" id="cases">
			<div class="section-head">
				<h3>想定例</h3>
			</div>
			<div class="grid cases">
				<div class="case">
					<h4>複数店舗の売上共有</h4>
					<p>売上のまとめが自動で集まり、閉店後の作業を短くすることができます。</p>
				</div>
				<div class="case">
					<h4>在庫管理の電子化、自動化</h4>
					<p>在庫の見え方を整えることで、発注時の不安を減らすことができます。</p>
				</div>
				<div class="case">
					<h4>報告書作成の支援アプリ導入</h4>
					<p>報告書づくりを効率化し、負担を軽くすることができます。</p>
				</div>
			</div>
		</section>

		<section class="section" id="profile">
			<div class="section-head">
				<h3>大切にしていること</h3>
			</div>
			<div class="profile">
				<div class="profile-card">
					<p class="badge">地元で活動</p>
					<p>地域の現場に寄りそい、状況に合わせて柔軟にサポートします</p>
				</div>
				<div class="profile-card">
					<p class="badge">現場目線</p>
					<p>机の上だけで決めず、実際の流れを大切にします。</p>
				</div>
				<div class="profile-card">
					<p class="badge">導入して終わりにしない</p>
					<p>使い続ける中で、困りごとに合わせて整えます。</p>
				</div>
			</div>
		</section>

		<section class="section" id="faq">
			<div class="section-head">
				<h3>よくある質問</h3>
			</div>
			<div class="faq">
				<div class="qa">
					<h4>ITが苦手でも大丈夫ですか？</h4>
					<p>大丈夫です。難しい言葉は使わず、しっかりと説明します。</p>
				</div>
				<div class="qa">
					<h4>小規模でも依頼できますか？</h4>
					<p>できます。小さな困りごとから始める方が多いです。</p>
				</div>
				<div class="qa">
					<h4>途中で変更できますか？</h4>
					<p>できます。使いながら一緒に見直します。</p>
				</div>
			</div>
		</section>

		<section class="section contact" id="contact">
			<div class="section-head">
				<h3>お問い合わせ</h3>
			</div>
			<div class="contact-body">
				<div class="panel contact-card contact-text">
					<p>
						困っていることを、短いメモでOKです。無理に売り込むことはしません。
						まずは話して、気持ちが楽になるかどうかを確かめてください。
					</p>
					<ul>
						<li>「この作業を楽にしたい」だけでもOK</li>
						<li>相談だけでもOK</li>
						<li>小さく始めたい、も大歓迎</li>
					</ul>
				</div>
				<form class="panel contact-card contact-form" @submit.prevent="handleSubmit">
					<div class="contact-row">
						<label>
							お店・会社名
							<input v-model.trim="form.company" type="text" placeholder="株式会社○○" autocomplete="organization" required />
						</label>
						<label>
							お名前
							<input v-model.trim="form.name" type="text" placeholder="山田 花子" autocomplete="name" required />
						</label>
					</div>
					<label>
						連絡先（電話 or メール）
						<input v-model.trim="form.contact" type="text" placeholder="090-0000-0000 / sample@example.com" autocomplete="email" required />
					</label>
					<label>
						相談内容
						<textarea v-model.trim="form.message" rows="4" placeholder="困っていることを短く書いてください" required></textarea>
					</label>
					<button type="submit" class="btn primary" :disabled="isSubmitting">
						{{ isSubmitting ? '送信中...' : '相談してみる' }}
					</button>
					<p v-if="submitError" class="form-note form-note--error">{{ submitError }}</p>
					<p v-else-if="submitSuccess" class="form-note form-note--success">{{ submitSuccess }}</p>
					<p v-else class="form-note">※ 送信後、確認してご連絡します。</p>
				</form>
			</div>
		</section>

		<section class="section" id="privacy">
			<div class="section-head">
				<h3>プライバシーポリシー</h3>
				<p>お客様の情報を安心してお預けいただくための方針です。</p>
			</div>
			<div class="panel privacy-card">
				<h4>個人情報の取り扱いについて</h4>
				<p>
					お問い合わせでお預かりした情報は、返信やご連絡の目的にのみ使用し、
					目的外での利用は行いません。
				</p>
				<h4>第三者提供について</h4>
				<p>
					法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはありません。
				</p>
				<h4>管理体制</h4>
				<p>
					個人情報への不正アクセスや漏えいを防ぐため、適切な管理を行います。
				</p>
				<h4>お問い合わせ</h4>
				<p>内容の確認や削除のご希望があれば、お問い合わせフォームよりご連絡ください。</p>
			</div>
		</section>

			<footer class="footer">
				<div class="footer-inner">
					<p>© 2026 地元のお店・会社サポート</p>
					<a href="#privacy">プライバシーポリシー</a>
				</div>
			</footer>
		</div>
	</main>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=Noto+Sans+JP:wght@400;500;700&display=swap");
:global(html),
:global(body) {
	background: #f4f5f7;
	overflow-x: hidden;
}

.page {
	--ink: #1f2937;
	--sub: #4b5563;
	--muted: #6b7280;
	--brand: #f59e0b;
	--brand-dark: #b45309;
	--panel: #ffffff;
	--soft: #fff7ed;
	--line: #e5e7eb;
	--shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
	--header-h: 64px;
	min-height: 100vh;
	width: 100%;
	max-width: 100%;
	padding: 88px 32px 120px;
	font-family: "BIZ UDPGothic", "Noto Sans JP", "Hiragino Sans", sans-serif;
	color: var(--ink);
	background:
		radial-gradient(circle at 75% 55%, rgba(253, 186, 116, 0.25) 0%, rgba(253, 186, 116, 0) 60%),
		radial-gradient(circle at 22% 70%, rgba(252, 211, 77, 0.18) 0%, rgba(252, 211, 77, 0) 60%),
		radial-gradient(circle at 15% 10%, #fff7ed 0%, #f4f5f7 45%, #edf2f7 100%);
	position: relative;
	isolation: isolate;
	overflow-x: hidden;
}

.page-inner {
	width: 100%;
	max-width: 1120px;
	margin: 0 auto;
}

.page::before,
.page::after {
	content: "";
	position: absolute;
	inset: auto;
	border-radius: 999px;
	filter: blur(0px);
	opacity: 0.25;
	z-index: -1;
}

.page::before {
	width: 420px;
	height: 420px;
	background: #fcd34d;
	top: -120px;
	left: -120px;
}

.page::after {
	width: 360px;
	height: 360px;
	background: #fdba74;
	bottom: 80px;
	right: -140px;
}

.hero {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 44px;
	align-items: center;
	padding: 40px;
	min-height: calc(100vh - var(--header-h) - 88px);
	margin-bottom: 64px;
	border-radius: 28px;
	background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
	box-shadow: var(--shadow);
	animation: fadeUp 0.8s ease both;
}

.hero,
.section {
	scroll-margin-top: 88px;
}

.eyebrow {
	letter-spacing: 0.12em;
	text-transform: uppercase;
	font-size: 12px;
	color: var(--muted);
	margin: 0 0 10px;
}

.hero h2 {
	font-family: "BIZ UDPGothic", "Noto Sans JP", "Hiragino Sans", sans-serif;
	font-size: clamp(28px, 4vw, 44px);
	margin: 0 0 12px;
	line-height: 1.4;
}

.hero h2 span {
	color: var(--brand-dark);
}

.hero-line {
	display: block;
}

.lead {
	font-size: 16px;
	line-height: 1.9;
	color: var(--sub);
	margin-bottom: 28px;
}

.hero-actions {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
}

.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	font-weight: 600;
	text-decoration: none;
	border: 1px solid transparent;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn.primary {
	background: var(--brand);
	color: #1f1300;
	box-shadow: 0 10px 20px rgba(245, 158, 11, 0.25);
}

.btn.ghost {
	background: #fff;
	color: var(--ink);
	border-color: var(--line);
}

.btn:hover {
	transform: translateY(-2px);
}

.btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
	transform: none;
	box-shadow: none;
}

.hero-card {
	background: #fff;
	border-radius: 20px;
	padding: 24px;
	border: 1px solid var(--line);
}

.card-title {
	font-weight: 700;
	margin-bottom: 10px;
}

.hero-card ul {
	margin: 0;
	padding-left: 18px;
	color: var(--sub);
	line-height: 1.8;
}

.section {
	margin-top: 0;
	min-height: calc(100vh - var(--header-h));
	padding: 72px 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	animation: fadeUp 0.7s ease both;
}

.section + .section {
	margin-top: 0;
}

.section-head h3 {
	font-family: "BIZ UDPGothic", "Noto Sans JP", "Hiragino Sans", sans-serif;
	font-size: clamp(22px, 3vw, 30px);
	margin: 0 0 18px;
}

.section-head p {
	margin: 0 0 32px;
	color: var(--muted);
}

.grid {
	display: grid;
	gap: 28px;
}

.pricing-stack {
	display: grid;
	gap: 20px;
}

.pricing-card .price {
	margin: 4px 0 12px;
	font-size: clamp(18px, 2.6vw, 24px);
	font-weight: 700;
	color: var(--brand-dark);
}

.pricing-cta {
	margin-top: 12px;
	align-self: flex-start;
}

.info-card {
	background: var(--soft);
	border-color: #f8d9a6;
	box-shadow: none;
}

.grid.worries {
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.grid.learn,
.grid.pricing,
.profile {
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.grid.services {
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.panel,
.card,
.case,
.profile-card,
.qa {
	background: var(--panel);
	border-radius: 16px;
	padding: 28px;
	border: 1px solid var(--line);
	box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
}

.panel h4,
.card h4,
.case h4,
.qa h4 {
	margin: 0 0 8px;
	font-size: 16px;
}

.panel p,
.card p,
.case p,
.qa p {
	margin: 0;
	color: var(--sub);
	line-height: 1.7;
}

.icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 12px;
	background: var(--soft);
	color: var(--brand-dark);
	font-size: 18px;
	margin-bottom: 12px;
}

.badge {
	display: inline-flex;
	padding: 6px 12px;
	border-radius: 999px;
	background: var(--soft);
	color: var(--brand-dark);
	font-weight: 600;
	font-size: 12px;
	margin-bottom: 8px;
}

.flow {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 24px;
}

.flow-card {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 18px;
	align-items: start;
}

.step {
	display: inline-flex;
	width: 34px;
	height: 34px;
	border-radius: 50%;
	background: var(--brand);
	color: #1f1300;
	align-items: center;
	justify-content: center;
	font-weight: 700;
}

.note {
	margin-top: 20px;
	color: var(--muted);
}

.profile {
	display: grid;
	gap: 28px;
}

.faq {
	display: grid;
	gap: 24px;
}

.contact {
	background: #fff7ed;
	border-radius: 24px;
	padding: 36px;
	box-shadow: var(--shadow);
}

.contact-body {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 32px;
	align-items: start;
}

.contact-card {
	background: #fff;
}

.contact-text p {
	margin: 0 0 16px;
	color: var(--sub);
	line-height: 1.9;
}

.contact-text ul {
	margin: 0;
	padding-left: 18px;
	color: var(--sub);
	line-height: 1.9;
}

.contact-form {
	display: grid;
	gap: 18px;
}

.contact-row {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
}

.contact-form label {
	display: grid;
	gap: 8px;
	font-size: 13px;
	color: var(--sub);
}

.contact-form input,
.contact-form textarea {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--line);
	border-radius: 12px;
	padding: 13px 15px;
	font-size: 14px;
	font-family: inherit;
}

.form-note {
	font-size: 12px;
	color: var(--muted);
	margin: 0;
}

.form-note--error {
	color: #b91c1c;
}

.form-note--success {
	color: #15803d;
}

.privacy-card h4 {
	margin: 18px 0 8px;
	font-size: 15px;
}

.privacy-card h4:first-of-type {
	margin-top: 0;
}

.privacy-card p {
	color: var(--sub);
	line-height: 1.8;
}

.footer {
	margin-top: 48px;
	padding: 24px 0 0;
	border-top: 1px solid var(--line);
}

.footer-inner {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 20px;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	color: var(--muted);
}

.footer a {
	color: var(--brand-dark);
	text-decoration: none;
	font-weight: 600;
}

.footer a:hover {
	text-decoration: underline;
}

@keyframes fadeUp {
	from {
		opacity: 0;
		transform: translateY(12px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 720px) {
	.page {
		padding: 110px 20px 84px;
	}

	.hero {
		padding: 28px;
	}

	.btn {
		width: 100%;
	}

	.flow li {
		grid-template-columns: 1fr;
	}

	.section {
		padding: 56px 20px;
		min-height: auto;
	}

	.contact-row {
		grid-template-columns: 1fr;
	}

	.contact {
		padding: 24px;
	}

	.contact-text {
		display: none;
	}

	.contact-form label {
		font-size: 12px;
	}

	.contact-form input,
	.contact-form textarea {
		font-size: 13px;
	}

	.form-note {
		font-size: 11px;
	}

	.footer-inner {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
