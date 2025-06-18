# SwifTicket – Universal Ticketing Platform

SwifTicket is a modern web-based ticket booking system designed to offer fast, secure, and unified access to events. Built using the MEVN Stack (MongoDB, Express, Vue, Node), it focuses on a streamlined user experience with clean UI, custom authentication logic, and upcoming support for OAuth and role-based access.

---

## Project Status

- Phase 1 (Frontend UI for Login & Registration) – Completed
- Phase 2 (API Testing and Backend Server) – Completed
- Phase 3 (Connecting the Database, Backend and the Frontend) – Completed
- Phase 4 (JWT Session Management, Route Protection and Forgot Password) – Ongoing
- Phase 5 (OAuth Integration and Role Expansion) – Planned

---

## Project Roadmap

### Phase 1: Frontend Development – Completed
- Responsive UI for Login and Sign-Up using Vue
- Form validations and route navigation
- State management with Vuex
- Page structure: `/login`, `/register`, `/dashboard`

### Phase 2: Mock API Integration and Testing – Completed
- Used Reqres and mock API for simulating login
- Pre-request duplicate checks using Postman scripts
- Validated API response flows and conditions

### Phase 3: Custom Backend with Node.js and Express – Completed
- Developed RESTful API routes: `/login`, `/register`
- Connected MongoDB via Mongoose
- Hashed passwords securely with bcrypt
- Created JWT tokens and stored using HTTP-only cookies
- Integrated Axios for frontend-backend communication

### Phase 4: JWT Session Management, Route Protection and Forgot Password – Ongoing
- Middleware to verify JWT tokens
- Role-based access (admin, vendor, user)
- Protected routes and redirection logic

### Phase 5: OAuth Integration and Role Expansion – Planned
- Implement Google/GitHub OAuth without external libraries
- Add DAuth-style flow
- Extend functionality with event creation and booking logic

---

## Tech Stack

**Frontend**
- Vue.js 2
- Vuex (state management)
- Vue Router
- Axios

**Backend**
- Node.js
- Express.js
- Mongoose
- bcrypt
- jsonwebtoken (JWT)

**Database**
- MongoDB (MongoDB Atlas)

**Testing**
- Postman (Manual API testing)
- Pre-request and Post-request scripting
