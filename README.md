# 💰 Finance Data Processing & Access Control Backend

## 📌 Project Overview

This project is a backend system for a finance dashboard that manages users, financial records, and provides summary analytics with role-based access control.

It demonstrates backend architecture, API design, data modeling, and access control implementation.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 👥 User Roles & Permissions

| Role    | Permissions                                        |
| ------- | -------------------------------------------------- |
| Admin   | Full access (Create, Update, Delete, Manage users) |
| Analyst | View records + Dashboard insights                  |
| Viewer  | Read-only access                                   |

---

## 📊 Features

### 🔹 User Management

* Create users
* Update user roles and status
* Fetch all users

### 🔹 Financial Records Management

* Create income/expense records
* Update records
* Delete records
* Filter by type and category
* Pagination support

### 🔹 Dashboard Analytics

* Total Income
* Total Expense
* Net Balance
* Category-wise aggregation
* Recent transactions

### 🔹 Access Control

* Role-based access using middleware
* Restricted routes for Admin and Analyst roles

### 🔹 Validation & Error Handling

* Input validation for records
* Proper status codes and error messages

---

## 🔗 API Endpoints

### 👤 Users

* `POST /users` → Create user
* `GET /users` → Get all users
* `PATCH /users/:id` → Update user

---

### 💵 Records

* `POST /records` → Create record (**Admin only**)
* `GET /records` → Get records (with filters & pagination)
* `PUT /records/:id` → Update record (**Admin only**)
* `DELETE /records/:id` → Delete record (**Admin only**)

---

### 📈 Dashboard

* `GET /dashboard/summary` → Income, Expense, Balance
* `GET /dashboard/category` → Category-wise totals
* `GET /dashboard/recent` → Recent transactions

---

## 📌 Example API Usage

### 🔹 Create User

**POST /users**

```json
{
  "name": "Abhishek",
  "email": "admin@test.com",
  "password": "123",
  "role": "admin"
}
```

---

### 🔹 Create Record

**POST /records**

Headers:

```
role: admin
```

Body:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "note": "monthly salary"
}
```

---

### 🔹 Get Records with Pagination

```
GET /records?page=1&limit=5
```

---

### 🔹 Get Dashboard Summary

```
GET /dashboard/summary
```

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd finance-backend
npm install
npx nodemon server.js
```

---

## 🔑 Environment Variables

Create a `.env` file and add:

```
MONGO_URI=mongodb://127.0.0.1:27017/financeDB
```

---

## 📌 Assumptions

* Role is passed via request headers for simplicity
* Single currency system
* Basic authentication not implemented (can be extended)

---

## 🚀 Future Improvements

* JWT Authentication
* User login system
* Advanced filtering (date range, search)
* Pagination metadata improvement
* Unit & integration testing
* API documentation (Swagger)

---
## ⚙️ Setup Instructions

```bash
npm install
npx nodemon server.js
## 📎 Conclusion

This project demonstrates a clean and scalable backend system with proper separation of concerns, role-based access control, and efficient data handling suitable for real-world applications.

---
