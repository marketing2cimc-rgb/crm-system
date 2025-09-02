-- schema
CREATE TABLE IF NOT EXISTS app_user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  role VARCHAR(20) DEFAULT 'sales',
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  credit_level VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS visit (
  id SERIAL PRIMARY KEY,
  salesman_id INT NOT NULL REFERENCES app_user(id),
  customer_id INT NOT NULL REFERENCES customer(id),
  visit_plan TEXT,
  visit_result TEXT,
  gps_lat DECIMAL(10,6),
  gps_lng DECIMAL(10,6),
  photo_url TEXT,
  visit_time TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS car_model (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(50),
  model VARCHAR(50),
  year INT,
  base_price DECIMAL(12,2)
);
CREATE TABLE IF NOT EXISTS car_option (
  id SERIAL PRIMARY KEY,
  model_id INT REFERENCES car_model(id) ON DELETE CASCADE,
  option_name VARCHAR(100),
  option_price DECIMAL(12,2)
);
CREATE TABLE IF NOT EXISTS intention_order (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customer(id),
  car_model_id INT NOT NULL REFERENCES car_model(id),
  qty INT NOT NULL,
  est_price DECIMAL(12,2),
  est_order_date DATE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS order_main (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customer(id),
  car_model_id INT NOT NULL REFERENCES car_model(id),
  qty INT NOT NULL,
  unit_price DECIMAL(12,2),
  total_price DECIMAL(14,2),
  status VARCHAR(20) DEFAULT 'created',
  sync_erp BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);
