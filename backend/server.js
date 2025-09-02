const cors = require("cors");
app.use(cors({
  origin: ["https://crm-free-stack-frontend.vercel.app"],
  credentials: true
}));
