# SwifTicket – Universal Ticket Booking System

SwifTicket is a full-stack web application built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js). It offers a seamless experience for booking tickets across different categories such as movies, concerts, events, and more.

---

## Project Status

- Phase 1 (Frontend UI for Login & Registration) – Completed
- Current Focus – Backend API setup with custom authentication

---

## Tech Stack

### Frontend
- Vue.js 2 – Component-based UI for building the user interface
- Vue Router – For routing between login, register, and dashboard pages
- Vuex – To manage global state (auth, user roles)
- Axios – For making API calls to backend

### Backend
- Node.js – Server runtime environment
- Express.js – RESTful API and middleware support
- Bcrypt – Password hashing and validation
- JSON Web Token (JWT) – Token-based session management
- MongoDB – NoSQL database for user and event data
- Mongoose – ODM for MongoDB

### Authentication
- Manual Authentication – Username/email and password based login
- OAuth 2.0 – Planned (Google, GitHub login without external libraries)
- Role-based Access Control – User, Vendor, Admin roles
- Token Storage – JWT stored on client via localStorage or Vuex

### Testing
- Postman – API testing and validation
- Pre-request Scripts – Email uniqueness and login validation
- Newman – CLI test automation (optional)

---

## Core Features

- User registration and login with hashed passwords
- Role differentiation: Admin, Vendor, and General User
- Token-based authentication using JWT
- Form validation and route guards
- Responsive UI with dynamic component switching (Login/Register)
- Event booking and listing (planned)

---

## Project Roadmap

### Phase 1: Frontend Development – Completed
- Responsive UI for Login and Sign-Up using Vue
- Form validations and route navigation
- State management with Vuex
- Page structure: `/login`, `/register`, `/dashboard`

### Phase 2: Mock API Integration and Testing
- Use Reqres or other mock APIs for simulating login
- Use Postman to test requests, responses, and conditions
- Pre-request checks for duplicates and validations

### Phase 3: Custom Backend with Node.js and Express
- Create REST API routes: `/login`, `/register`, `/profile`
- Connect to MongoDB via Mongoose
- Hash passwords with bcrypt
- Use JWT for login and protected routes

### Phase 4: Secure Role-Based Access and API Protection
- Role check for admin/vendor routes
- Middleware to verify JWT in backend
- Setup error responses and access control

### Phase 5: OAuth 2.0 and Advanced Features
- Add Google/GitHub login without third-party libraries
- Integrate OAuth flow manually (DAuth style)
- Add event creation and booking modules

---