
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// Health
app.get('/api/health', async (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// helper
function sign(user) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

async function ensureAdmin() {
  const { rows } = await pool.query("SELECT id FROM app_user WHERE role='admin' LIMIT 1");
  if (rows.length === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await pool.query("INSERT INTO app_user(email, password_hash, role) VALUES($1,$2,$3)", ['admin@local', hash, 'admin']);
    console.log('Seeded default admin: admin@local / admin123');
  }
}

// JWT middleware
function auth(required = true) {
  return (req, res, next) => {
    const hdr = req.headers.authorization || '';
    const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
    if (!token) {
      if (required) return res.status(401).json({ error: 'Unauthorized' });
      req.user = null; return next();
    }
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}

// Boot: ensure schema
const fs = require('fs');
(async () => {
  try {
    const schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
    await pool.query(schema);
    await ensureAdmin();
    console.log('Schema ensured.');
  } catch (e) {
    console.error('Schema init error', e);
  }
})();

// Auth
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email/password required' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const q = await pool.query("INSERT INTO app_user(email, password_hash, role) VALUES($1,$2,$3) RETURNING id, email, role", [email, hash, role || 'sales']);
    const user = q.rows[0];
    return res.json({ token: sign(user), user });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'email exists' });
    return res.status(500).json({ error: 'register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const q = await pool.query("SELECT * FROM app_user WHERE email=$1", [email]);
  if (q.rows.length === 0) return res.status(401).json({ error: 'invalid credentials' });
  const user = q.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  return res.json({ token: sign(user), user: { id: user.id, email: user.email, role: user.role } });
});

// Generic helpers
function crud(table, fields) {
  app.get(`/api/${table}`, auth(), async (req, res) => {
    const q = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    res.json(q.rows);
  });
  app.get(`/api/${table}/:id`, auth(), async (req, res) => {
    const id = +req.params.id;
    const q = await pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id]);
    if (!q.rows[0]) return res.status(404).json({ error: 'not found' });
    res.json(q.rows[0]);
  });
  app.post(`/api/${table}`, auth(), async (req, res) => {
    const values = fields.map(k => req.body[k]);
    const cols = fields.join(',');
    const params = fields.map((_,i)=>`$${i+1}`).join(',');
    const q = await pool.query(`INSERT INTO ${table}(${cols}) VALUES(${params}) RETURNING *`, values);
    res.json(q.rows[0]);
  });
  app.put(`/api/${table}/:id`, auth(), async (req, res) => {
    const id = +req.params.id;
    const sets = fields.map((k,i)=>`${k}=$${i+1}`).join(',');
    const values = fields.map(k => req.body[k]);
    values.push(id);
    const q = await pool.query(`UPDATE ${table} SET ${sets} WHERE id=$${fields.length+1} RETURNING *`, values);
    res.json(q.rows[0]);
  });
  app.delete(`/api/${table}/:id`, auth(), async (req, res) => {
    const id = +req.params.id;
    await pool.query(`DELETE FROM ${table} WHERE id=$1`, [id]);
    res.json({ ok: true });
  });
}

// Register CRUDs
crud('customer', ['name','type','credit_level','phone','email','address']);
crud('car_model', ['brand','model','year','base_price']);
crud('car_option', ['model_id','option_name','option_price']);
crud('visit', ['salesman_id','customer_id','visit_plan','visit_result','gps_lat','gps_lng','photo_url','visit_time']);
crud('intention_order', ['customer_id','car_model_id','qty','est_price','est_order_date','status']);
crud('order_main', ['customer_id','car_model_id','qty','unit_price','total_price','status','sync_erp']);

// Special endpoints
app.post('/api/orders/convert/:intentionId', auth(), async (req, res) => {
  const id = +req.params.intentionId;
  const q = await pool.query("SELECT * FROM intention_order WHERE id=$1", [id]);
  if (!q.rows[0]) return res.status(404).json({ error: 'intention not found' });
  const it = q.rows[0];
  const unit = it.est_price || 0;
  const total = unit * it.qty;
  const o = await pool.query("INSERT INTO order_main(customer_id, car_model_id, qty, unit_price, total_price, status, sync_erp) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [it.customer_id, it.car_model_id, it.qty, unit, total, 'created', false]);
  await pool.query("UPDATE intention_order SET status='converted' WHERE id=$1", [id]);
  res.json(o.rows[0]);
});

app.post('/api/orders/:id/sync-erp', auth(), async (req, res) => {
  const id = +req.params.id;
  await pool.query("UPDATE order_main SET sync_erp=true, status='synced' WHERE id=$1", [id]);
  res.json({ ok: true });
});

// Reports
app.get('/api/reports/sales/monthly', auth(), async (req, res) => {
  const q = await pool.query(`
    SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS month,
           COALESCE(SUM(total_price),0) as sales
    FROM order_main
    GROUP BY 1
    ORDER BY 1
  `);
  res.json(q.rows);
});

app.listen(PORT, () => console.log('API listening on ' + PORT));
