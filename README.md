# 🎓 SKASC Voice — AI-Powered Smart Complaint & Escalation System

> An intelligent grievance management system for Sri Krishna Arts and Science College, Coimbatore.

![SKASC](https://skasc.ac.in/wp-content/uploads/2025/02/skasc-logo.png)

## 🌐 Live Demo
🔗 **Frontend:** [https://ai-smart-complaint-system.vercel.app](https://ai-smart-complaint-system.vercel.app)  
🔗 **Backend API:** [https://ai-smart-complaint-system-6s5k.onrender.com](https://ai-smart-complaint-system-6s5k.onrender.com)  
📁 **GitHub:** [https://github.com/rasheeqa-codes/AI-Smart-Complaint-System](https://github.com/rasheeqa-codes/AI-Smart-Complaint-System)

---

## 📌 About the Project

SKASC Voice is a full-stack AI-powered web application that modernizes the student grievance redressal process at Sri Krishna Arts and Science College. Instead of paper-based or email-based complaint submission, students can raise complaints digitally through text or voice, and the system automatically classifies, prioritizes, routes, and escalates them — all without manual intervention.

---

## ✨ Features

### 🎓 For Students
- Submit complaints via **text or voice input** (Web Speech API)
- **Anonymous complaint** option for sensitive issues
- Unique **Complaint ID** generated for every submission
- Real-time **complaint status tracking** by ID (no login required)

### 🤖 AI Module
- **NLP-based classification** into 5 categories: Academic, Infrastructure, Hostel, Transport, Harassment
- **Priority detection**: High, Medium, Low
- **Auto-generated summary** of each complaint

### ⚡ Escalation Engine
- Automatic escalation: **Department Staff → HOD → Principal**
- Time-based: 24 hours → HOD, 48 hours → Principal, 72 hours → Critical Alert
- Full **audit trail** maintained in escalation log

### 📊 Role-Based Dashboards
- **Staff:** View and manage assigned complaints, mark In Progress / Resolved, delete invalid complaints
- **HOD:** View all department complaints + escalated cases, analytics cards
- **Principal:** View only escalated complaints, institution-wide analytics
- **Search and filter** by category, priority, and status

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 + Vite |
| Backend | Python FastAPI |
| Database | PostgreSQL (Supabase) |
| AI Engine | NLP Rule-based Classifier |
| Voice Input | Web Speech API |
| Authentication | JWT + Role-based Access |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure
AI-Smart-Complaint-System/
│
├── frontend/ ← React.js (Vite)
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── context/
│ ├── routes/
│ └── layouts/
│
├── backend/ ← Python FastAPI
│ ├── routers/
│ │ ├── auth.py
│ │ ├── complaints.py
│ │ └── dashboard.py
│ ├── ai_service.py
│ ├── escalation.py
│ └── main.py
│
└── README.md
---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 👥 User Roles

| Role | Access |
|---|---|
| Student | Submit complaints, track status |
| Staff | View assigned complaints, update status, delete invalid |
| HOD | View department complaints, resolve escalations |
| Principal | View critical escalations, institution analytics |

---

## 📊 Complaint Workflow
Student Submits Complaint
↓
AI Classifies (Category + Priority + Summary)
↓
Auto-Routed to Department Staff
↓
24hrs unresolved → Escalated to HOD
↓
48hrs unresolved → Escalated to Principal
↓
72hrs unresolved → Critical Alert
↓
Resolved ✅
---

## 🏫 About SKASC

Sri Krishna Arts and Science College (SKASC) is an autonomous institution affiliated to Bharathiar University, located at Kuniamuthur, Coimbatore — 641 008, Tamil Nadu, India. Ranked #50 among colleges in NIRF 2025.

---

## 📄 License

MIT License — Copyright © 2026 Rasheeqa Fathima S

---

## 🙏 Acknowledgements

- Sri Krishna Arts and Science College, Coimbatore
- Department of Computer Applications
- Built as Capstone Project — Academic Year 2025-2026
