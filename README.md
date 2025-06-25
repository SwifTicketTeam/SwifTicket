# SwifTicket – Universal Ticketing Platform

SwifTicket is a full-stack universal ticket booking platform developed using Vue.js, Node.js, and MongoDB. It provides seamless user authentication, profile management, event browsing, and movie discovery features. The platform is backed by a real-world movie dataset and optimized for responsiveness with debounced search, genre filtering, and dynamic routing.

---

## Project Roadmap

- Phase 1: Frontend Development
- Phase 2: API Integration and Backend Server Setup
- Phase 3: Database and Custom Authentication
- Phase 4: JWT Session Management and Email Messaging
- Phase 5: Events Page Layout and Session Verification
- Phase 6: My Account Tabs and Movie Page Routing
- Phase 6 Extended: Persistent Storage and API Docs
- Phase 7: Profile Enhancement & Movie Dataset Integration
- Phase 8: Search, Filter & Dynamic Routing
- Phase 9: UI Overhaul and Favorites System

---

## Project Overview

### Frontend Features

* Redesigned UI layout and navigation structure in Phase 9.
* Responsive interfaces for login, registration, dashboard, and profile
* Dynamic routing with route guards and animated page transitions
* Global state management using Vuex for authentication and session persistence
* Organized multi-page structure: `/`, `/home`, `/account`, `/event`, `/reset-password`, and more
* Editable profile section with support for profile image uploads, bio, username updates, and logout
* Favorites system: movies can be favorited and fetched from server

### Backend & API Features

* Modular Express server handling authentication, user data, and image uploads
* MongoDB integration using Mongoose with well-defined schemas and validations
* JWT-based authentication system for secure session handling
* Integrated email verification and password reset flows using Nodemailer
* Persistent image uploads with static serving for profile pictures and movie posters
* API documentation route providing details of all available endpoints
* Favorites API route to retrieve user-specific movie data

### Events & Movies Section

* Linked real-world movie dataset (9,800+ movies) to events system
* Posters downloaded and stored locally with reference mapping in MongoDB
* Live search bar with debounced input to reduce request load
* Multi-select genre filter system to refine movie listings
* Dedicated dynamic pages for each movie with routing and placeholder actions

### User Experience & Design

* Polished UI with icon-based navigation and updated logo
* Favorites Tab added under My Account for personalized access
* Conditional UI behavior based on user roles (User or Vendor)
* Modular component design and organized folder structure for maintainability

---

## Tech Stack

**Frontend**
* Vue.js 2
* Vuex (State Management)
* Vue Router
* Axios

**Backend**
* Node.js
* Express.js
* Mongoose

**Database**
* MongoDB Compass / MongoDB Atlas

**Testing**
* Postman (Manual API Testing)
