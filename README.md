# 🚀 LaunchLens

**Validate your product before you write code.**

LaunchLens is a production-ready frontend simulation of a product testing platform. It connects product creators (SaaS, Apps, Games) with targeted testers to provide structured feedback, ratings, and video insights.

> **Design Style:** "Cosmic Industrial" — Featuring deep obsidian backgrounds, glassmorphism, spotlight borders, and high-contrast electric violet/acid lime accents.

---

## ✨ Key Features

### 👨‍💻 For Creators
*   **Targeted Test Creation:** Create validation tests for 5 specific niches (SaaS, Mobile Apps, Games, Digital Products, E-commerce).
*   **Smart Audience Filtering:** Filter testers by age, gender, and interests.
*   **Realistic Checkout:** Integrated credit card form with validation, formatting, and order summary.
*   **Analytics Dashboard:** View aggregate stats, response progress, and individual tester feedback.
*   **Video Insights:** (Simulated) Video playback interface for user recording sessions.

### 🕵️‍♀️ For Testers
*   **Earn & Level Up:** Complete tests to earn credits and progress through Bronze, Silver, and Gold tiers.
*   **Interest Matching:** Algorithm matches available tests based on user profile interests.
*   **Guided Testing:** Step-by-step testing workflow including instruction review, screen recording simulation, and structured feedback forms.
*   **Wallet:** Track earnings and completed test history.

### 🛠 System Features
*   **Authentication:** Complete Login/Register flows with role selection.
*   **Mock Backend:** Fully functional `MockDB` service simulating async API calls, network latency, and data persistence via LocalStorage.
*   **Profile Management:** Editable user profiles with dynamic stats.
*   **Responsive Design:** Mobile-first architecture using Tailwind CSS.

---

## 🛠️ Tech Stack

*   **Framework:** [React 18](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom "Cosmic" Config)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/launchlens.git
    cd launchlens
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:5173`

---

## 🔐 Demo Credentials

The application uses a mock database seeded with initial data. You can log in immediately with these accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Creator** | `creator@demo.com` | *Any password* |
| **Tester** | `tester@demo.com` | *Any password* |

*Note: You can also register new accounts via the Sign Up page.*

---

## 📂 Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── ui/             # Primitives (Button, Card, Input, Badge)
│   ├── Navbar.tsx      # Main navigation
│   └── Layout.tsx      # App wrapper
├── contexts/           # React Context (AuthContext)
├── pages/              # Route views
│   ├── creator/        # Creator specific dashboards & flows
│   ├── tester/         # Tester specific dashboards & flows
│   ├── Auth.tsx        # Login/Register
│   ├── Landing.tsx     # Public Landing Page
│   └── Profile.tsx     # User Profile Settings
├── services/           # Mock API & Database logic
├── types.ts            # TypeScript definitions
└── constants.ts        # Static data (Niches, Pricing)
```

---

## 🎨 Design System

The UI is built on a custom Tailwind configuration located in `index.html`:

*   **Colors:**
    *   `Background`: #02040a (Deep Space)
    *   `Primary`: Violet (#7C3AED)
    *   `Accent`: Acid Lime (#BEF264)
    *   `Cyan`: Electric Blue (#22D3EE)
*   **Typography:**
    *   Headings: `Inter` (Tight tracking, bold weights)
    *   Data/Labels: `JetBrains Mono`
*   **Effects:**
    *   Spotlight Gradients
    *   Glassmorphism (Backdrop Blur)
    *   Noise Textures

---