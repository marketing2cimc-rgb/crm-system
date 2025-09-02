const cors = require("cors");

app.use(cors({
  origin: [
    "https://crm-system-ekzz.onrender.com", // 你的前端地址（Vercel）
    "http://localhost:3000" // 本地调试时用
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


import express from "express";
import cors from "cors";

const app = express();

// 允许跨域
app.use(cors({
  origin: [
    "https://crm-system-tawny-nine.vercel.app", // 你的前端地址
    "http://localhost:3000" // 本地开发调试
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// 其他中间件
app.use(express.json());