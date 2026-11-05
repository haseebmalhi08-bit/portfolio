# 🚀 Haseeb's Portfolio — Full Stack MERN

A complete, professional portfolio website with a **secure admin panel** built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## ✨ Features

### Public Portfolio
- **Hero Section** — Name, role, tagline, profile photo, social links
- **Profile photo editor** — Upload a JPG, PNG, or WebP image in the admin panel; images are resized and saved with your MongoDB portfolio data
- **About Me** — Bio with animated stats
- **Skills** — Progress bars grouped by category
- **Services** — What you offer
- **Experience** — Work history timeline
- **Education** — Academic background
- **Projects** — Filterable grid with tech stack, links, images
- **Certificates** — Achievement cards with issuer, date, links
- **Contact** — Phone, email, address, contact form (with Nodemailer)
- **Dark/Light mode** toggle
- **Fully responsive** — Mobile, tablet, desktop
- **Separate portfolio pages** — Home, About, Skills, Experience, Education, Projects, Certificates, Services, and Contact each have a direct page link

### Admin Panel
- Accessible via the **⚙️ button** in the navbar, or press **Ctrl+Shift+E**
- Password-protected with JWT authentication
- **10 editable sections**: Hero, About, Contact, Skills, Projects, Certificates, Experience, Education, Services, SEO & Theme
- Mobile-friendly sidebar layout
- Toast notifications on save
- Changes **instantly reflect** on the public site
- Portfolio content and uploaded profile photo are stored in MongoDB, not only in the browser
- The seed command only creates starter data when the database is empty; it will not overwrite saved portfolio content

---

## 🛠️ Tech Stack

| Layer      | Technology |
|-----------|------------|
| Frontend  | React 18, Vite, Vanilla CSS |
| Backend   | Node.js, Express.js |
| Database  | MongoDB (Mongoose) |
| Auth      | JWT (jsonwebtoken) |
| Email     | Nodemailer (Gmail) |

---

## 📁 Project Structure

```
portfolio-3d/
├── portfolio-3d/          ← Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    ← UI components
│   │   ├── hooks/         ← usePortfolioData (API hook)
│   │   ├── App.jsx
│   │   └── styles.css
│   └── server/            ← Backend (Express + MongoDB)
│       ├── models/        ← Portfolio schema
│       ├── routes/        ← API routes
│       ├── middleware/     ← JWT auth
│       ├── seed.js        ← DB seed script
│       ├── index.js       ← Server entry point
│       └── .env           ← Environment variables
└── backend/               ← (legacy, can be ignored)
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 1. Clone / Open the Project
```bash
cd "portfolio-3d/portfolio-3d"
```

### 2. Setup Backend

```bash
cd server
cp .env.example .env
```

Edit `.env` and fill in your values:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/portfolio
JWT_SECRET=your_random_secret_here
ADMIN_PASSWORD=your_admin_password
PORT=5000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Install backend dependencies:
```bash
npm install
```

Seed the database with initial data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
✅ Backend runs on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal:
```bash
# From portfolio-3d/ (the Vite root)
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

---

## 🔐 Admin Panel Access

1. Click the **⚙️ Settings icon** in the top-right of the navbar
2. Enter your `ADMIN_PASSWORD` from `.env`
3. You're in! All changes save directly to MongoDB

**Keyboard shortcut**: `Ctrl + Shift + E` to open/close

> 💡 JWT token expires after **12 hours** — you'll be prompted to log in again.

---

## 📧 Email Setup (Contact Form)

To enable email sending via the contact form:

1. Use a Gmail account
2. Enable **2-Factor Authentication** on your Google account
3. Generate an **App Password**: Google Account → Security → App Passwords
4. Add to your `.env`:
   ```
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

If not configured, the contact form still works — it logs the message on the server console.

---

## 🚀 Deployment

### Frontend (Vercel / Netlify)
```bash
npm run build
```
- Deploy the `dist/` folder
- Page URLs use hash-based routing, so links such as `/#/education` also work on GitHub Pages
- Set environment variable: `VITE_API_URL=https://your-backend.render.com`

### Backend (Render / Railway)
- Connect your Git repo
- Set all environment variables from `.env`
- Start command: `npm start`
- Build command: `npm install`

### Database (MongoDB Atlas)
- Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
- Add your server's IP to the Atlas network allowlist
- Use the connection string as `MONGODB_URI`

---

## 📝 Customization

Use the **Admin Panel** to update portfolio content, profile photo, theme, and SEO. Changes are saved to MongoDB. Configure the backend in `server/.env` before starting the API.

---

## 🔧 Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Backend (in `server/`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Start production server |
| `npm run seed` | Seed MongoDB with initial data |

---

## 📄 License
MIT — free to use and modify.
