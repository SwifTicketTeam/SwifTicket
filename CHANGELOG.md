# Changelog – SwifTicket

All notable changes to this project are documented here.

---

## [Pre Beta v0.0] – June 18, 2025

### Phase 1 – Frontend Foundation

- Created `Auth.vue` as the main wrapper for authentication
- Developed `Login.vue` and `Register.vue` with dynamic toggle support
- Implemented `Card.vue` for branding and layout control
- Built responsive UI using modern Flexbox layouts
- Unified visual design through shared CSS for form components
- Added "Forgot Password" link and styled submit buttons
- Established reusable and modular Vue component structure

---

## [Beta v0.0] – June 19, 2025

### Phase 2 – Backend Integration and API Testing

- Set up Node.js + Express.js backend with `/login` and `/register` routes
- Connected Vue frontend to backend via Axios
- Replaced mock API with real-time backend calls
- Validated request/response flows using Postman
- Configured environment variables for secure development
- Linked MongoDB Atlas and integrated Mongoose for data modeling

---

### Phase 3 – Database and Authentication Logic

- Designed `User` schema with proper field validation and indexing
- Applied secure password hashing via `bcrypt`
- Implemented JWT-based login authentication
- Stored JWT in Vuex and localStorage for client session state
- Added unique email validation and duplicate handling
- Enabled full registration/login functionality across frontend and backend

---

## [Beta Extended v0.0] – June 19, 2025

### Phase 4 – Session Management, Email Workflows, and Reset Flow Setup

- Integrated JWT session creation logic for secure login sessions
- Configured Nodemailer to send:
  - Welcome emails post-registration
  - Password reset emails with tokenized links
- Added reset password routing and designed the reset form layout
- Implemented the "Forgot Password" request flow with secure link generation
- Verified base reset flow using temporary token structure and tested via email

---

## [v0.0] – June 20, 2025

### Phase 4 – Forgot Password Completion and Token Security Enhancements

- Finalized full **Forgot Password** functionality:
  - Verified user identity through email
  - Sent reset password email containing **expiring JWT token**
  - Updated password securely via reset route after token verification
- Used `jwt.verify()` to decode and validate reset tokens on the server
- Improved handling for expired or invalid tokens with detailed error messages
- Optimized server logic and added confirmation flow for successful resets
- Polished messaging, routing, and backend token workflows

---

## [Pre Beta v0.1] – June 21, 2025
*Note: OAuth and Role-Based Route Protection have been postponed. Route protection will be implemented once vendor and admin dashboards are structured.*

### Phase 5 – Events Page Layout, Session Verification, and Visual Enhancements

- Introduced official SwifTicket logo to reinforce branding
- Resolved login-related token handling bugs to ensure stable authentication
- Built the initial `Events` page layout featuring:
  - Fixed-position header bar
  - Integrated event search input for future filtering
- Verified sessions using JWT and populated Vuex state with:
  - Authenticated user's username, email, and role
- Ensured users are redirected to the `Events` page immediately after login
- Added `Dashboard` navigation from `Events` for seamless user flow
- Implemented `verification-error` page to handle broken/invalid email token links gracefully
  - Prevented the server’s `/verify` endpoint from idling or misrouting
- Enhanced text responsiveness and spacing across all screens for better visual hierarchy and clarity

---
