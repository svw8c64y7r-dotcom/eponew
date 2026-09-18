# Implementation Plan - Epotech Cybersecurity & Web Development Platform

Build a complete, production-ready, highly animated multi-page web application and Python FastAPI backend for **Epotech**—a registered cybersecurity and custom web development firm.

The solution features a dark-mode cybersecurity visual design, interactive client portal, service request system, security audit posture report viewer, Supabase Auth/Postgres integration, and Vercel serverless deployment setup.

---

## User Review Required

> [!IMPORTANT]
> **Safety & Architectural Notice regarding Network Scanning**:
> As per safe development and security guidelines, the backend security analysis endpoint provides domain authorization validation, security header analysis, SSL/TLS certificate verification, and safe network posture diagnostic reports. Real-time active offensive port scanning against arbitrary targets is replaced with safe posture auditing and structured reporting metrics suitable for serverless deployment on Vercel (within 10s execution limits).

> [!NOTE]
> **Supabase & Vercel Integration**:
> The application includes full Supabase client setup (`SUPABASE_URL` & `SUPABASE_ANON_KEY`). When environment variables are provided, requests persist directly to Supabase Postgres. Intelligent fallback mock storage is included so the entire frontend and backend operate seamlessly out-of-the-box before environment keys are set.

---

## Proposed Project Architecture

```
epotech-platform/
├── api/
│   ├── index.py                  # FastAPI serverless entrypoint for Vercel
│   └── main.py                   # FastAPI routers, Supabase client, & audit logic
├── src/
│   ├── assets/                   # Cyber icons, logos, & graphics
│   ├── components/
│   │   ├── Navbar.jsx            # Sleek glassmorphism header with active state
│   │   ├── Footer.jsx            # Modern footer with compliance & status indicators
│   │   ├── Hero.jsx              # Animated cyber hero section with stats counter
│   │   ├── ServiceCard.jsx       # Interactive hover cards with neon glow borders
│   │   ├── AuditReportViewer.jsx # Visual audit report parser & breakdown chart
│   │   └── RequestModal.jsx      # Service request submission modal
│   ├── pages/
│   │   ├── HomePage.jsx          # High-conversion landing page
│   │   ├── ServicesPage.jsx      # Detailed Web Dev & Pentesting offerings
│   │   ├── AuthPage.jsx          # Login & Register with Supabase Auth support
│   │   └── DashboardPage.jsx     # Client dashboard for tracking requests & audits
│   ├── lib/
│   │   ├── supabase.js           # Supabase client setup
│   │   ├── apiClient.js          # Unified API wrapper for FastAPI endpoints
│   │   └── mockData.js           # Realistic initial security reports & requests
│   ├── App.jsx                   # Main routing & state management
│   ├── index.css                 # Custom cyber theme, glassmorphism, glow utilities
│   └── main.jsx                  # React entry point
├── vercel.json                   # Vercel serverless function & routing configuration
├── requirements.txt              # FastAPI, uvicorn, supabase, pydantic dependencies
├── package.json                  # Vite, React, Tailwind CSS, Lucide icons, Framer Motion
├── tailwind.config.js            # Custom dark cybersecurity color palette & gradients
├── vite.config.js                # Vite build setup with proxy for local FastAPI dev
└── README.md                     # Setup, deployment, and environment guide
```

---

## Proposed Changes

### Component 1: Frontend Application (Vite + React + Tailwind + Framer Motion)

#### [NEW] [`package.json`](file:///c:/Users/hngga/Downloads/epoteck%20new/package.json)
Configure Vite, React 18, Tailwind CSS, Lucide React icons, Framer Motion, and Supabase JS client dependencies.

#### [NEW] [`tailwind.config.js`](file:///c:/Users/hngga/Downloads/epoteck%20new/tailwind.config.js)
Define custom cybersecurity theme colors:
- Backgrounds: `#090d16` (Deep Space Dark), `#0e1424` (Charcoal Slate), `#141c33` (Card Glass)
- Primary Accents: `#00f0ff` (Cyber Cyan), `#3b82f6` (Electric Blue)
- Security Accents: `#10b981` (Secure Emerald), `#f59e0b` (Warning Amber), `#ef4444` (Critical Red), `#8b5cf6` (Neon Violet)

#### [NEW] [`src/index.css`](file:///c:/Users/hngga/Downloads/epoteck%20new/src/index.css)
Custom CSS utilities for glassmorphism backdrop blur, animated glowing gradients, cyber grid overlay, and keyframe animations.

#### [NEW] [`src/pages/HomePage.jsx`](file:///c:/Users/hngga/Downloads/epoteck%20new/src/pages/HomePage.jsx)
Animated hero section with interactive threat prevention counter, value propositions, service highlights, client testimonials, and CTA.

#### [NEW] [`src/pages/ServicesPage.jsx`](file:///c:/Users/hngga/Downloads/epoteck%20new/src/pages/ServicesPage.jsx)
Comprehensive breakdowns for:
1. **Custom Web Development**: Full-stack Next.js/React, API integration, secure architecture.
2. **Penetration Testing & Security Audits**: Web application testing, cloud vulnerability assessment, network posture verification, compliance reporting.

#### [NEW] [`src/pages/AuthPage.jsx`](file:///c:/Users/hngga/Downloads/epoteck%20new/src/pages/AuthPage.jsx)
Professional login and registration interfaces supporting Supabase Auth, credential validation, and JWT session handling.

#### [NEW] [`src/pages/DashboardPage.jsx`](file:///c:/Users/hngga/Downloads/epoteck%20new/src/pages/DashboardPage.jsx)
Client portal with:
- **Overview**: Active project counters, security audit score badge, quick actions.
- **Service Requests**: Create and track status of Web Dev and Security Audit requests.
- **Security Audit Tool**: Input target host/domain with authorization confirmation, trigger safe automated posture check, and view parsed interactive scan reports.
- **Report Viewer**: Visual breakdown of open ports, TLS certificate health, security headers grade, and vulnerability remediation steps.

---

### Component 2: Backend API (Python FastAPI + Supabase + Vercel Serverless)

#### [NEW] [`api/index.py`](file:///c:/Users/hngga/Downloads/epoteck%20new/api/index.py)
FastAPI ASGI entrypoint mapped for Vercel Serverless runtime (`@vercel/python`).

#### [NEW] [`api/main.py`](file:///c:/Users/hngga/Downloads/epoteck%20new/api/main.py)
Full FastAPI backend implementing:
- `/api/health`: Health status.
- `/api/auth/verify`: Token & session verification.
- `/api/requests`: CRUD endpoints for client service requests with Supabase integration.
- `/api/audit/scan`: Secure target validation & security posture assessment generator.

#### [NEW] [`requirements.txt`](file:///c:/Users/hngga/Downloads/epoteck%20new/requirements.txt)
Python dependencies: `fastapi`, `uvicorn`, `supabase`, `pydantic`, `python-dotenv`, `requests`, `pyjwt`.

---

### Component 3: Deployment & Configuration

#### [NEW] [`vercel.json`](file:///c:/Users/hngga/Downloads/epoteck%20new/vercel.json)
Vercel deployment configuration mapping `/api/(.*)` to `api/index.py` with `@vercel/python` and static frontend build routing.

#### [NEW] [`env.example`](file:///c:/Users/hngga/Downloads/epoteck%20new/.env.example)
Template environment configuration for `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`.

---

## Verification Plan

### Automated Verification
1. **Frontend Build & Lint**:
   - Run `npm run build` to verify clean React/Vite compilation without TypeScript/JSX errors.
2. **Backend Syntax & FastAPI Verification**:
   - Test FastAPI backend instantiation using `python -c "from api.index import app; print(app.title)"`.
   - Run local dev server using `uvicorn api.index:app` or Vite proxy.

### Manual Verification
1. Navigate across Home, Services, Auth, and Dashboard pages.
2. Test registration and login flow (Supabase Auth / fallback session state).
3. Submit a custom Web Development request and Penetration Testing request from the Client Dashboard.
4. Run a target security posture audit in the dashboard and verify the parsed visual report (ports, headers, TLS grade, recommendations).
