export const INITIAL_SERVICE_REQUESTS = [
  {
    id: "req_9921",
    service_type: "Penetration Testing",
    title: "Quarterly Web App Vulnerability Assessment",
    target: "api.nexus-bank.io",
    status: "in_progress",
    priority: "high",
    created_at: "2026-09-12T10:30:00Z",
    assigned_lead: "Alex Rivera (Senior SecOps)",
    notes: "Full OWASP Top 10 evaluation, authenticated testing requested."
  },
  {
    id: "req_8842",
    service_type: "Custom Web Development",
    title: "High-Performance Fintech Dashboard Build",
    target: "fintech-v2.internal",
    status: "review",
    priority: "medium",
    created_at: "2026-09-08T14:15:00Z",
    assigned_lead: "Elena Rostova (Lead Full-Stack)",
    notes: "Next.js 14 architecture with strict Content Security Policy (CSP)."
  },
  {
    id: "req_7710",
    service_type: "Security Audit & Architecture",
    title: "Cloud Infrastructure Hardening Review",
    target: "aws-prod-us-east-1",
    status: "completed",
    priority: "critical",
    created_at: "2026-08-28T09:00:00Z",
    assigned_lead: "Marcus Vance (Principal Auditor)",
    notes: "Remediation verified for 14 microservices and IAM policies."
  }
];

export const INITIAL_AUDIT_REPORTS = [
  {
    scan_id: "scan_001",
    target: "api.epotech.io",
    timestamp: "2026-09-18T18:45:00Z",
    overall_score: 94,
    grade: "A+",
    scan_duration_ms: 842,
    summary: {
      critical_vulnerabilities: 0,
      high_vulnerabilities: 0,
      medium_vulnerabilities: 1,
      low_vulnerabilities: 3,
      passed_checks: 28
    },
    ports: [
      { port: 80, service: "HTTP", status: "open (Redirects to 443)", risk: "Low" },
      { port: 443, service: "HTTPS (TLS 1.3)", status: "open", risk: "Passed" },
      { port: 22, service: "SSH", status: "filtered / hardened", risk: "Passed" },
      { port: 5432, service: "PostgreSQL", status: "closed / shielded", risk: "Passed" }
    ],
    headers: {
      "Strict-Transport-Security": { status: "PASS", detail: "max-age=31536000; includeSubDomains; preload" },
      "Content-Security-Policy": { status: "PASS", detail: "strict-dynamic script-src enforced" },
      "X-Frame-Options": { status: "PASS", detail: "DENY" },
      "X-Content-Type-Options": { status: "PASS", detail: "nosniff" },
      "Referrer-Policy": { status: "WARN", detail: "strict-origin-when-cross-origin (Recommend no-referrer)" }
    },
    ssl_info: {
      valid: true,
      issuer: "Let's Encrypt Authority X3",
      expires_in_days: 82,
      protocol: "TLSv1.3",
      cipher: "TLS_AES_256_GCM_SHA384"
    },
    recommendations: [
      "Set Referrer-Policy to 'no-referrer' to avoid cross-domain token leaks.",
      "Ensure SSH access on port 22 is restricted to specific VPN IP ranges.",
      "Implement rate limiting header responses (X-RateLimit) on public authentication endpoints."
    ]
  }
];
