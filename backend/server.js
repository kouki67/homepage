import express from 'express';
import helmet from 'helmet';
// import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from "express-rate-limit";

import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT;

// セキュリティ対策
app.use(helmet());

//レート制限
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10分
  max: 30,                  // 10分に30回まで
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS設定
const allowedOrigins = (process.env.FRONTEND_ORIGIN)
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//apiのレート制限
app.use('/api', apiLimiter);

app.use('/api/contact', contactRoutes);

// サーバー起動
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
