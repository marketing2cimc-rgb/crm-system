import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 连接MongoDB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.log('MongoDB连接失败:', err));

// 基本路由
app.get('/api/health', (req, res) => {
  res.json({ message: 'CRM后端服务器运行正常', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误', error: err.message });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ message: '路由未找到' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

export default app;