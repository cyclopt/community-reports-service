<h1 align="center">Welcome to Cyclopt Reports Service 👋</h1>

A Node‑based microservice that generates PDF documents covering software quality, security and maintainability.

## 🧩 Features

- <b>📊 Project Report</b><br/>
  Summarize project statistics, contributions, quality indicators and code metrics. Visualize additions, deletions and efficiency trends.

- <b>💼 Offer Report</b><br/>
  Generate proposal-style documents that bundle project analyses into a structured, client‑ready offer.

- <b>🛡️ Vulnerabilities Report</b><br/>
  Collect and present vulnerability scans, security issues and detected violations. Useful for audits and compliance monitoring.

- <b>📑 Technical Due Diligence (TDD) Report</b><br/>
  A full Technical Due Diligence report, aggregating metrics on vulnerabilities, maintainability, code health and best‑practice adoption.  
  Designed for investor or partner evaluations, and enriched with LLM‑generated explanations.

- <b>🔐 NIS2 Compliance Report</b><br/>
  Evaluate alignment with the NIS2 cybersecurity directive. Summarize gaps and strengths, supporting regulatory compliance.

- <b>⚙️ Integration</b><br/>
  Exposes REST endpoints to trigger report generation and download as PDF.  
  Supports email delivery through SendGrid.

## 🛠️ Prerequisites

Make sure you have installed:
- [Node.js ↗](https://nodejs.org/en) (>=20)
- [npm ↗](https://www.npmjs.com/)

## 🚀 Getting Started

### 1. Clone repository
```sh
git clone https://github.com/cyclopt/community-reports-service.git
cd community-reports-service
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file based on `.env.sample` and fill in your values:

- `PORT` – Port for the service (default: 3000)  
- `SERVER_URL` – Base URL of the backend API **(Required)**  
- `SENDGRID_API_KEY` – API key for email delivery **(Optional)**  
- `LLM_SERVICE_URL` – URL of your LLM integration service (if used for text generation)  

## ▶️ Running the Service

Start development server:
```sh
npm run dev
```

Build and run production server:
```sh
npm run build && npm start
```

## 🧪 Testing
Run lint tests:
```sh
npm test
```

## 🔗 Available Endpoints

- `POST /project-report` – Generate a project report  
- `POST /offer-report` – Generate an offer report  
- `POST /vulnerabilities-report` – Generate a vulnerabilities report  
- `POST /tdd-report` – Generate a Technical Due Diligence report  
- `POST /nis2-report` – Generate an NIS2 compliance report
