# StudyPilot AI 🚀

![StudyPilot AI](public/logo.svg)

StudyPilot AI is a comprehensive, production-ready Full Stack Agentic AI Application designed to revolutionize the way students learn and prepare for their studies. By leveraging the power of modern web technologies and Large Language Models (LLMs), StudyPilot provides personalized, adaptive study plans, cognitive analytics, and an interactive AI Tutor.

---

## ✨ Agentic AI Features

This project implements **two substantial Agentic AI features** that go beyond simple text generation, demonstrating reasoning, decision-making, and contextual awareness:

1. **Cognitive AI Tutor (Chat Assistant):** 
   A conversational assistant integrated directly into the application. It understands the context of the user's study plans, maintains conversation history, and provides intelligent, context-aware answers to help students with their specific subjects.
   
2. **AI Study Plan Generator (Content Generation):** 
   Users can input a topic, difficulty, and duration, and the AI automatically generates a complete, structured syllabus. It handles reasoning to break down complex topics into digestible daily or weekly tasks, automatically generating short descriptions, full schedules, and tags.

## 🌟 Core Features

- **Explore Plans:** Browse, search, filter, and sort through a vast library of study plans.
- **Dynamic Dashboard:** Track your enrolled plans, monitor progress, and manage your learning journey.
- **Plan Details & Reviews:** View comprehensive details of a study plan, see related plans, and leave ratings/reviews.
- **Secure Authentication:** JWT-based custom authentication paired with Google Social Login for seamless onboarding.
- **Responsive Design:** A beautiful, fully responsive UI built with Tailwind CSS, ensuring a perfect experience across mobile, tablet, and desktop.
- **Premium UX:** Polished interactions, skeleton loaders, custom SVG branding, and a clean 3-color primary palette.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching & Caching:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Authentication:** `@react-oauth/google`
- **Charts & Analytics:** Recharts
- **Markdown Rendering:** React Markdown & Remark GFM

### Backend (Separate Repository)
- **Environment:** Node.js & Express.js
- **Language:** TypeScript
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** Google Gemini API (`@google/generative-ai`)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Project (for OAuth Client ID)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kazi-Samin/StudyPilot-ai.git
   cd StudyPilot-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Your backend API URL (e.g., http://localhost:5000)
   VITE_API_URL=your_backend_url_here

   # Your Google OAuth Client ID for Social Login
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Cards, ProtectedRoute, etc.)
├── context/          # React Context providers (AuthContext)
├── hooks/            # Custom React hooks (TanStack Query hooks)
├── pages/            # Page components (Home, Explore, Dashboard, AIChat, etc.)
├── services/         # API integration services (axios instances)
├── types/            # TypeScript interface definitions
├── App.tsx           # Main application routing
└── main.tsx          # Application entry point
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
