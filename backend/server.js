const cors = require("cors");

app.use(cors({
  origin: [
    "https://crm-system-ekzz.onrender.com", // 你的前端地址（Vercel）
    "http://localhost:3000" // 本地调试时用
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
