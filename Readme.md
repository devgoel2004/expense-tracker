# Expense Tracker

## Project Overview

Expense Tracker is a full-stack web application that helps users manage and track their daily expenses efficiently. Users can add, edit, delete, and filter expenses while viewing detailed insights into their spending patterns.

## Features

- User authentication (Signup/Login) with JWT
- Create, read, update, and delete (CRUD) expenses
- Pagination and category-based filtering for expenses
- Secure backend with role-based access
- Responsive UI with a user-friendly dashboard
- Expense visualization and analytics
- Email notifications for user actions

## Tech Stack

### Frontend:

- React.js
- React Router
- Axios
- Tailwind CSS
- React Data Table Component

### Backend:

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Nodemailer for email notifications

## Installation and Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/devgoel2004/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Setup Backend

```sh
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend server:

```sh
npm start
```

### 3️⃣ Setup Frontend

```sh
cd frontend
npm install
npm run dev
```

## API Endpoints

### **User Authentication**

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/user/register`    | Register a new user |
| POST   | `/user/login`       | Login and get JWT   |
| GET    | `/user/getAllUsers` | Get all users       |
| GET    | `/user/profile`     | Get user details    |
| PUT    | `/user/profile`     | Update user profile |

### **Expense Management**

| Method | Endpoint                                 | Description                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| POST   | `/expense`                               | Create a new expense                         |
| GET    | `/expense?page=1&limit=10&category=Food` | Get all expenses with pagination & filtering |
| PUT    | `/expense/:id`                           | Update an expense                            |
| DELETE | `/expense/:id`                           | Delete an expense                            |

## UI Components

- **Dashboard**: Displays all expenses with filtering & pagination.
- **Add Expense Form**: Allows users to input expense details.
- **Edit Expense Page**: Users can update existing expenses.
- **Login/Register Pages**: Handles authentication.

## Welcome Email Template

```
Subject:  Welcome to Expense Tracker

Dear [User's Name],

Welcome to **Expense Tracker**! We’re thrilled to have you on board. Managing your expenses just got easier and smarter.

Happy tracking!
**The Expense Tracker Team**
```

## Security Measures

- Passwords are securely hashed using bcrypt.
- JWT-based authentication for secure API access.
- Data validation to prevent unwanted data.

## Future Enhancements

- Multi-user collaboration feature.
- AI-driven expense predictions.
- Dark mode toggle.
- Export expenses to CSV/PDF.

## Contributors

- **devgoel2004** ([@devgoel2004](https://github.com/devgoel2004))

## License

This project is licensed under the MIT License.

---

Happy Coding & Expense Tracking!
