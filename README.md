# Personal Finance Tracker

Personal Finance Tracker is a full-stack web application that allows users to manage their personal expenses and monthly budgets in one place. Users can securely register and log in, manage their own expenses, filter their spending, view category-wise charts, and track their monthly budget.

## Features

- User registration and login
- JWT-based authentication
- Protected routes and APIs
- Add, edit, and delete expenses
- User-specific expense data
- Monthly expense tracking
- Category and date-range filters
- Monthly spending total
- Category-wise spending chart
- Monthly budget management
- Remaining budget calculation
- Over-budget status
- Loading and error handling
- Responsive design
- Backend health check

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Router DOM
- Tailwind CSS
- Recharts
- Fetch API
- LocalStorage

### Backend

- Node.js
- Express.js
- REST API
- Mongoose
- JWT
- Authentication Middleware
- CORS
- dotenv

### Database

- MongoDB Atlas
- Mongoose

### Authentication

The application uses JWT authentication. After login, the JWT token is stored in LocalStorage and is sent with protected API requests. Authentication middleware verifies the token and identifies the logged-in user.

Each user's expenses are stored with their user ID, so users can access only their own expense data.

## Live Demo

### Frontend
Live Frontend URL=https://personal-finance-tracker-react-theta.vercel.app/

### Backend API
Live Backend API URL=https://personal-finance-tracker-api-yryz.onrender.com

## Main API Routes

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id

GET    /api/summary/by-category

GET    /api/budget
PUT    /api/budget

GET    /api/health
