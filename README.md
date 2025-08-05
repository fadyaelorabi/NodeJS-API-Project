# Node.js RESTful API Project

A scalable and secure REST API built using **Node.js**, **Express**, and **MongoDB**. This project follows industry best practices, including MVC architecture, modular routing, centralized error handling, and standardized API responses using the **jSend specification**. It includes robust authentication, authorization, and file upload mechanisms, along with a Postman collection for API testing.

---

## 🔧 Core Features

### 🚀 Express Setup
- Configured an Express application for handling HTTP requests.
- Defined base routes and middleware.

### 🧩 Middleware Integration
- Applied essential middleware for request parsing, error handling, and logging.

### 🛢️ MongoDB Connection
- Connected to a MongoDB database using **Mongoose**.
- Database credentials and configurations managed via environment variables.

### 📄 Mongoose ODM
- Defined data schemas and models.
- Leveraged Mongoose methods for database operations.

### 📦 jSend Response Format
- Ensured consistent API responses using the jSend specification:
  - `status`: success | fail | error
  - `data`, `message` keys included accordingly.

### 🔐 Environment Configuration
- Managed application settings securely with **dotenv**.

### 📄 Pagination Support
- Implemented pagination through query parameters (`page`, `limit`) for efficient data retrieval.

### 🌐 Cross-Origin Resource Sharing (CORS)
- Configured CORS to enable controlled access from external origins.

### ⚠️ Centralized Error Handling
- Standardized and centralized error responses with proper HTTP status codes and messaging.

---

## 👤 Authentication & User Management

### 🧍 User Model, Routes & Controllers
- Developed full user CRUD functionality.
- Organized using the MVC pattern.

### 📝 User Registration
- Secure user registration endpoint with input validation.

### 🔐 Password Hashing
- Used **bcrypt.js** to hash user passwords before storing them.

### 🔑 Login with JWT
- Implemented secure login with **JWT** token generation.

### 🛡️ Protected Routes
- JWT-based middleware for protecting API endpoints.

### 🎯 Role-Based Authorization
- Assigned roles (e.g., admin, user) and controlled access to resources accordingly.

---

## 📤 File Upload

### 🖼️ Multer Integration
- Enabled file upload functionality using **Multer**.
- Validated and stored uploaded files securely.

---

## 📬 API Testing

### 🧪 Postman Collection
- A comprehensive **Postman collection** is included to test all endpoints.
- Pre-configured with authentication, protected routes, and file upload requests.

---

## 📁 Project Structure

