<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=ElevateU&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Your%20Personalized%20Self-Improvement%20Hub&descAlignY=60&descSize=18" />

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-ElevateU-a78bfa?style=for-the-badge)](https://elevateyou-five.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚡%20Backend%20API-Live%20on%20Render-34d399?style=for-the-badge)](https://elevateu-backend-act6.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-60a5fa?style=for-the-badge)](LICENSE)

<br/>

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_18-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white)

<br/>

> **ElevateU** is a comprehensive full-stack self-advancement platform that helps you prepare for professional environments, optimize communication skills, and bring out your best self — powered by **Google Gemini Vision** and **Groq Llama 3.3**.

<br/>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📸 AI Outfit Scanner
- **Live Camera Capture** — Snapshot your outfit directly from the browser
- **Visual Analysis** — Powered by Gemini 1.5 Flash for expert style feedback
- **Text Mode** — Describe your outfit if you don't have a photo

</td>
<td width="50%">

### 💬 AI Communication Trainer
- **AI Chatbot** — Practice interviews, grammar & rephrasing with Llama 3.3 70B
- **Dynamic Feedback** — Real-time professional critique of your responses
- **Topic-based Practice** — Tailored coaching per communication goal

</td>
</tr>
<tr>
<td width="50%">

### 🧠 AI-Powered Quizzes
- **20+ Mastery Levels** — Across 6 topics with AI-generated unique scenarios
- **Adaptive Difficulty** — Scales to your current performance
- **Local Fallback** — Works even if the AI service is temporarily busy

</td>
<td width="50%">

### 📅 Event Prep Guides
- **30+ Life Scenarios** — Built-in expertise for real-world events
- **AI Personalization** — Guides tailored to your specific event and role
- **Rich Structured Data** — Actionable, step-by-step preparation plans

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite, Tailwind CSS v4, Framer Motion, Lucide React |
| **State Management** | Context API (Auth + Theme) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **AI — Vision** | Google Gemini 1.5 Flash |
| **AI — Language** | Groq API (Llama 3.3 70B) |
| **Auth** | JWT (JSON Web Tokens) |
| **Deployment** | Vercel (Frontend) · Render (Backend) |

---

## 🏗️ Architecture

```
ElevateU/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages
│   │   ├── context/           # Auth & Theme providers
│   │   └── config.js          # API base URL config
│   └── vite.config.js
│
├── backend/                   # Node.js + Express API
│   ├── routes/                # 6 route files (auth, outfit, quiz, etc.)
│   ├── models/                # Mongoose schemas
│   ├── middleware/            # JWT auth middleware
│   └── server.js
│
└── README.md
```

> Decoupled frontend-backend model communicating via secured REST APIs with JWT authentication.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account
- Google Gemini API key
- Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/Kanak172k5/Elevateyou.git
cd ElevateU
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_key
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Make sure `config.js` or `.env` in frontend points to `http://localhost:5000` for local development.

---

## 🌐 Deployment

| Service | Platform | Status |
|---------|----------|--------|
| Frontend | Vercel | ✅ [Live](https://elevateyou-five.vercel.app/) |
| Backend API | Render | ✅ [Live](https://elevateu-backend-act6.onrender.com) |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GEMINI_API_KEY` | Google Gemini API key (Vision) |
| `GROQ_API_KEY` | Groq API key (Llama 3.3 70B) |

---

## 👩‍💻 Author

<div align="center">

Kanak Khandelwal
*B.Tech CSE · Medi-Caps University, Indore*

[![GitHub](https://img.shields.io/badge/GitHub-Kanak172k5-181717?style=flat-square&logo=github)](https://github.com/Kanak172k5)

[![Email](https://img.shields.io/badge/Email-khandelwalkanak160@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:khandelwalkanak160@gmail.com)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" />

*If you found this useful, don't forget to ⭐ the repo!*

</div>
