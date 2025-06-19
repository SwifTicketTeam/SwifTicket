# Changelog – SwifTicket

All notable changes to this project are documented here.

---

## [Pre Beta v0.0] – June 18, 2025

### Phase 1 – Frontend Foundation

- Created `Auth.vue` as the main container component for authentication
- Developed `Login.vue` and `Register.vue` with toggle logic and shared form structure
- Built `Card.vue` for branding and switchable layout
- Achieved a responsive UI with Flexbox
- Unified styles between login and register forms using a shared stylesheet
- Added “Forgot Password” and submit functionalities to both forms
- Established modular and reusable Vue component architecture

---

## [Beta v0.0] – June 19, 2025

### Phase 2 – API Testing and Backend Server Integration

- Developed backend with Node.js and Express.js
- Connected frontend using Axios for `/login` and `/register` routes
- Integrated Postman for API testing using real server endpoints
- Removed mock API; tested with actual backend functionality
- Configured MongoDB Atlas with Mongoose

---

### Phase 3 – Database and Authentication

- Designed `User` schema with validation (username, email, password)
- Applied password hashing via `bcrypt`
- Implemented JWT-based authentication for login
- Tokens stored in **Vuex and localStorage** (not cookies)
- Handled duplicate email errors using MongoDB unique indexing
- Completed full registration and login flow

---

## [Beta Extended v0.0] – June 19, 2025

### Phase 4 – JWT Session Management, Email Messaging, and Forgot Password (In Progress)

- JWT-based session creation completed
- Nodemailer integration for sending:
    - Welcome emails after registration
    - Password reset emails via secure link
- Reset password form UI and endpoint routing setup started
- Initial version of forgot password functionality implemented
- Link generation logic added
- Placeholder logic for password update on reset route

---

## [v0.0] – June 20, 2025

### Phase 4 – Forgot Password Completed and Bug Fixes

- Completed the full **Forgot Password** flow:
    - Verified user email
    - Sent password reset email with secure reset link
    - Reset link now includes **JWT token with expiry** for security
    - Password updated on confirmation via reset page
- Used `jwt.verify()` to validate and extract token payload
- Improved server response and error messaging for invalid/expired tokens
- Resolved token decoding bugs and refined reset-password route logic
- Finalized form and messaging for successful password change

---
