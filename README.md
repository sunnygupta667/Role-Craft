# 🚀 ROLE CRAFT: Modern Multi-Portfolio Platform

A complete full-stack multi-portfolio platform with admin dashboard, built with modern technologies.

## 📋 Features

- ✅ **Multi-Portfolio Support** - Create unlimited portfolios with unique URLs
- ✅ **Admin Dashboard** - Full CRUD operations for portfolio management
- ✅ **Dark/Light Themes** - Per-portfolio theme selection
- ✅ **Smooth Animations** - Framer Motion powered animations
- ✅ **Responsive Design** - Mobile-first Tailwind CSS
- ✅ **File Uploads** - Resume and image upload via Cloudinary
- ✅ **JWT Authentication** - Secure admin authentication
- ✅ **MongoDB Database** - Scalable data storage
- ✅ **Modern Stack** - React + Vite + Express + MongoDB
- ✅ **Secure Change Password** - Provide a OTP bases Two-factor authentication password change feature

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS 3
- Framer Motion
- React Router 6
- Axios

### Backend

- Node.js (ES Modules)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Cloudinary
- Multer

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Cloudinary account (free tier works)

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create .env file**

```bash
cp .env.example .env
```

4. **Configure environment variables** in `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multi-portfolio
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
EMAIL_USERNAME= your_email_address
EMAIL_PASSWORD= your_email_app_passwords

```

5. **Start the backend server**

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create .env file**

```bash
cp .env.example .env
```

4. **Configure environment variables** in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start the development server**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Admin Management & Security

1. **Create first admin account** by making a POST request:

1. Option A: Using curl

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin@123"
  }'
```

2. Option B: Using Postman

- Endpoint: POST /api/auth/create-admin
- Body:

```JSON

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

2. **Login** at `http://localhost:5173/admin/login`

3. **IMPORTANT**: After creating your admin account, disable the create-admin endpoint in production by commenting it out in `backend/routes/authRoutes.js` to prevent unauthorized account creation.

## 📖 Usage Guide

### Creating a Portfolio

1. Login to admin dashboard
2. Click "Create New Portfolio"
3. Fill in basic information:

   - Job Role (e.g., "Frontend Developer")
   - URL Slug (e.g., "frontend-developer")
   - Theme (Dark/Light)
   - Enable/Disable status

4. Fill in Hero section:

   - Name, Title, Subtitle
   - Description
   - Profile image (after saving)

5. Add Skills (click + to add categories):

   - Category name (e.g., "Frontend")
   - Skills with proficiency levels

6. Add Projects:

   - Title, Description
   - Technologies used
   - Live URL, GitHub URL
   - Mark as featured

7. Add Experience:

   - Company, Position, Duration
   - Responsibilities

8. Add Education:

   - Institution, Degree, Field
   - Duration, Grade

9. Add Contact Information:

   - Email, Phone
   - Social media links
   - Resume upload

10. Click "Create Portfolio"

### Accessing Portfolios

Each portfolio is accessible at:

```
http://localhost:5173/portfolio/[your-slug]
```

Example:

```
http://localhost:5173/portfolio/frontend-developer
http://localhost:5173/portfolio/backend-developer
```

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**

3. **Set environment variables**:

   - All variables from `.env`
   - Set `NODE_ENV=production`
   - Update `MONGODB_URI` to MongoDB Atlas connection string
   - Update `FRONTEND_URL` to your frontend URL

4. **Build Command**: `npm install`

5. **Start Command**: `npm start`

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**

2. **Import project in Vercel**

3. **Configure**:

   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set environment variable**:

   - `VITE_API_URL=https://your-backend-url.com/api`

5. **Deploy**

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (or allow all: 0.0.0.0/0)
5. Get connection string
6. Update `MONGODB_URI` in backend environment variables

### Cloudinary Setup

1. Create account at https://cloudinary.com (free tier available)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Update backend environment variables

## 📁 Project Structure

```
multi-portfolio-platform/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── portfolioController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Portfolio.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── portfolioRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Loading.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── ThemeToggle.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── PortfolioFormPage.jsx
    │   │   └── PortfolioPage.jsx
    │   │   ├── ChangePasswordPage.jsx
    │   │   └── ForgotPasswordPage.jsx
    │   ├── sections/
    │   │   ├── HeroSection.jsx
    │   │   ├── SkillsSection.jsx
    │   │   ├── ProjectsSection.jsx
    │   │   ├── ExperienceSection.jsx
    │   │   ├── EducationSection.jsx
    │   │   └── ContactSection.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using modern web technologies
