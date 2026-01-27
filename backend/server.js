import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import templateRoutes from './routes/template.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// セキュリティ対策
app.use(helmet());

// CORS設定
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5100')
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/template', templateRoutes); 
app.use('/contact', contactRoutes);

// ルーター
// 管理者用
// app.use('/admin/auth', auth);
// app.use('/admin/employees', authMiddleware, employees);
// app.use('/admin/attendance', authMiddleware, attendance);

// 勤怠管理用
// app.use('/attendance/auth', attendanceAuth);
// app.use('/attendance/employees', attendanceAuthMiddleware, attendanceEmployees);
// app.use('/attendance', attendanceAuthMiddleware, attendanceAttendance);

// サーバー起動
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
