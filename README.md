# SwifTicket – Universal Ticketing Platform

SwifTicket is a modern web-based ticket booking system designed to offer fast, secure, and unified access to events. Built using the MEVN Stack (MongoDB, Express, Vue, Node), it focuses on a streamlined user experience with clean UI, custom authentication logic, and upcoming support for OAuth and role-based access.

---

## Project Status

- Phase 1 (Frontend UI for Login & Registration) – Completed
- Phase 2 (API Testing and Backend Server) – Completed
- Phase 3 (Connecting the Database, Backend and the Frontend) – Completed
- Phase 4 (JWT Session Management, Email Messaging, and Forgot Password) – Completed
- Phase 5 (Events Page Layout, Session Verification, and Visual Enhancements) – Completed  
  *Note: OAuth and Role-Based Route Protection are postponed. Route protection is on hold until admin/vendor-specific pages are developed.*
- Phase 6 (My Account Tab, Transitions, and Event Page Routing) – Completed
- Phase 6 Extended: Persistent Storage, API Documentation, and Structural Cleanup – Completed

---

## Project Roadmap

### Phase 1: Frontend Development – Completed
- Responsive UI for Login and Sign-Up using Vue
- Form validations and route navigation
- State management with Vuex
- Page structure: `/`, `/home`, `/account`

### Phase 2: API Integration and Backend Server Setup – Completed
- Developed Express server with endpoints for login and registration
- Designed and tested RESTful routes using Postman
- Connected frontend forms with backend via Axios
- Setup environment variables for frontend and backend

### Phase 3: Database and Custom Authentication – Completed
- Integrated MongoDB with Mongoose for persistent storage
- Defined `User` model with schema constraints and validations
- Hashed passwords securely using bcrypt
- Handled unique email validation errors from MongoDB
- Implemented JWT-based authentication for login
- Frontend now receives and stores tokens using Vuex and localStorage

### Phase 4: JWT Session Management, Email Messaging, and Forgot Password – Completed
- Created JWT tokens with secure expiry handling
- Built and sent dynamic HTML emails for onboarding and password reset
- Integrated email verification and reset logic using Nodemailer
- Implemented forgot password functionality via email token verification
- Verified new password securely and updated in the database

### Phase 5: Events Page Layout, Session Verification, and Visual Enhancements – Completed
- Added Events Listing page layout with header and search functionality
- Implemented dashboard redirection and verification error handling
- Enhanced token-based session verification and Vuex state update
- Integrated logo and improved layout design and responsiveness

### Phase 6: My Account Tab, Transitions, and Event Page Routing – Completed
- Created `My Account` tab with the following options:
  - Profile, Transaction History, My Tickets, Favorites, Security
  - If user: "Become a Vendor" option
  - If vendor: "Manage Events" option
- Implemented authentication verification before every route navigation
- Added transition fade effects across component rerenders
- Built `/event` route to display selected event card
  - Includes back button functionality
- Added `Profile` tab showing profile picture, username, and email
  - Uploaded image preview works; not yet connected to backend storage

### Phase 6 Extended: Persistent Storage, API Documentation, and Structural Cleanup – Completed

- Added backend support for file storage to persist files.
- Profile picture now remains visible across sessions and across devices
- Refactored and cleaned up project directory structure
- Added detailed **API documentation** page to support developers and testing
- Revised and standardized API route naming for `GET` and `POST` endpoints

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
