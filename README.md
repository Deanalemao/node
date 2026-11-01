# MERN Employee Management System

A simple full-stack Employee Management application built with MongoDB, Express, React, and Node.js.

## Features

- View all employees
- Add an employee
- Edit employee details
- Delete an employee
- Search employees by name, email, or department
- Backend health endpoint
- Responsive interface

## Project structure

```text
mern-employee-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── employeeController.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeTable.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Configure the backend

Open `backend/.env.example`, copy it to `backend/.env`, and configure the values.

Linux/macOS:
```bash
cp backend/.env.example backend/.env
```

Windows PowerShell:
```powershell
Copy-Item backend/.env.example backend/.env
```

Example:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
CLIENT_URL=http://localhost:5173
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## 2. Configure the frontend

Copy `frontend/.env.example` to `frontend/.env`.

Linux/macOS:
```bash
cp frontend/.env.example frontend/.env
```

Windows PowerShell:
```powershell
Copy-Item frontend/.env.example frontend/.env
```

Default:
```env
VITE_API_URL=http://localhost:5001/api
```

## 3. Install dependencies

From the project root:
```bash
npm install
npm run install:all
```

The first command installs the root development tool (`concurrently`). The second installs backend and frontend dependencies.

## 4. Start the application

Make sure MongoDB is running, then from the project root:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001
- Backend health check: http://localhost:5001/health
- API base: http://localhost:5001/api/employees

You can also run each part in a separate terminal:

```bash
npm run dev --prefix backend
```

```bash
npm run dev --prefix frontend
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get one employee |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

Example employee JSON:
```json
{
  "name": "Alex Smith",
  "email": "alex@example.com",
  "department": "Engineering",
  "salary": 45000
}
```

## Notes

- This project is intentionally supplied without Dockerfiles, Docker Compose, or container configuration so you can practise containerizing it yourself.
- Do not commit `backend/.env` or real database credentials to Git.
- The backend validates required fields and returns JSON errors.
