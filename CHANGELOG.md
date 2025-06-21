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

## [Pre Beta v0.1] – June 21, 2025
*Note: OAuth and Role-Based Route Protection have been postponed. Route Protection is on hold until vendor/admin page structures are defined.*

### Phase 5 – Events Page Layout, Session Verification, and Visual Enhancements

- Added official SwifTicket logo for Branding
- Fixed bugs related to the login system for more reliable authentication flow
- Implemented `Events` page layout with a structured header and a search bar
- Introduced JWT session verification on each login
  - Sent verified user details (username, email, and role) to Vuex state
  - Maintains session state as long as token is valid
- Redirected authenticated users to the `Events` page after login
- Added a `Dashboard` button to the `Events` page for easy navigation
- Created a `verification-error` page to gracefully handle failed email token verification attempts
  - Prevents backend `/verify` route from hanging or looping
- Improved responsive design and readability across all pages by refining text scaling and layout

---

## [Beta v0.1] – June 22, 2025

### Phase 6 – My Account Tab, Transitions, and Event Page Routing

- Introduced `My Account` tab featuring:
  - Profile
  - Transaction History
  - My Tickets
  - Favorites
  - Security
  - Conditional options:
    - User: "Become a Vendor"
    - Vendor: "Manage Events"
- Added authentication re-verification before page rendering and route changes for enhanced security
- Introduced global transition fade effects during rerouting
- Created `/event` route triggered by clicking on an event card
  - Includes a back button to return to Events List
- Built Profile display with:
  - Profile picture (Will not retain on leaving the My Account Tab)
  - Username
  - Email address
