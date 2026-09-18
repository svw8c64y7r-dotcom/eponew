# Epotech Cybersecurity & Web Engineering Platform

Epotech is a production-ready, full-stack cybersecurity web application built for registered cybersecurity and web engineering services.

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Python 3.11/3.13, FastAPI (ASGI)
- **Database & Auth**: Supabase Postgres & Supabase Auth SDK
- **Deployment**: Vercel Serverless Functions (`@vercel/python` & `@vercel/static-build`)

## Project Structure

```
├── api/
│   ├── index.py          # Serverless entrypoint for Vercel (@vercel/python)
│   └── main.py           # FastAPI application, routes, Supabase client, & audit logic
├── src/
│   ├── components/       # Hero, Navbar, Footer, ServiceCard, AuditReportViewer, RequestModal
│   ├── pages/            # HomePage, ServicesPage, AuthPage, DashboardPage
│   ├── lib/              # supabase.js, apiClient.js, mockData.js
│   ├── App.jsx           # Main routing & state controller
│   └── index.css         # Dark cybersecurity glassmorphism theme
├── vercel.json           # Vercel serverless routing config
├── requirements.txt      # Python backend dependencies
├── package.json          # Node.js frontend dependencies
├── supabase_schema.sql   # Database setup SQL script
└── .env.example          # Environment variables template
```

## Setup & Local Development

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Run Frontend Development Server
```bash
npm run dev
```

### 3. Run FastAPI Backend (Optional Local Python Dev)
```bash
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000
```

## Vercel Deployment

1. Push code to GitHub/GitLab repository.
2. Import project into Vercel Dashboard.
3. Configure Environment Variables in Vercel settings:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! Vercel will automatically route `/api/*` to `api/index.py` using `@vercel/python` and serve the React build.
