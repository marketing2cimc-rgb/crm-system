# Free CRM Stack (Backend + Frontend)

## Deploy Steps

### 1) Database (Neon)
- Create a Postgres DB
- Copy connection string, e.g. `psql 'postgresql://neondb_owner:npg_Sfq8DR7CLvgi@ep-young-butterfly-ad76jn6k-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'`

### 2) Backend (Render)
- Create Web Service from `/backend`
- Build: `npm install`
- Start: `npm start`
- Env:
  - DATABASE_URL=postgresql://neondb_owner:npg_Sfq8DR7CLvgi@ep-young-butterfly-ad76jn6k-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
  - JWT_SECRET=choose_a_strong_secret
- On first boot it seeds admin user: `admin@local / admin123`

### 3) Frontend (Vercel)
- Import `/frontend`
- Env:
  - NEXT_PUBLIC_API_URL=https://crm-system-ekzz.onrender.com
- Open `/` to login

## Features
- Login (JWT), Customers, Visits (GPS fields), Models/Options, Intention -> Order conversion, ERP sync flag, Monthly sales report.
