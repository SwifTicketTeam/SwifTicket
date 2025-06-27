# SwifTicket – Universal Ticketing Platform

SwifTicket is a full-stack universal ticket booking platform developed using Vue.js, Node.js, and MongoDB. It provides simple user authentication, profile management, event surfing, and movie discovery features. The platform is backed by a real-world movie dataset and optimized for responsiveness with debounced search, genre filtering, and dynamic routing.

---

## Project Roadmap

- Phase 1: Frontend Development
- Phase 2: API Integration and Backend Server Setup
- Phase 3: Database and Custom Authentication
- Phase 4: JWT Session Management and Email Messaging
- Phase 5: Events Page Layout and Session Verification
- Phase 6: My Account Tabs and Movie Page Routing
- Phase 6 Extended: Persistent Storage and API Docs
- Phase 7: Profile Improvement & Movie Dataset Integration
- Phase 8: Search, Filtering & Dynamic Routing
- Phase 9: UI Redesign and Favorites System
- Phase 10: Ticket Booking Base and City Support
- Phase 11: Vendor Panel and Theatre Management

---

## Project Overview

### Frontend Features

- Complete redesign of UI layout and navigation structure
- Responsive interfaces: login, registration, dashboard, and profile
- Vue Router with dynamic routes, animated transitions, and route guards
- Vuex state management for session persistance
- Modular page layout including:
    - `/`, `/home`, `/account`, `/event`, `/reset-password`, `/showtime`, etc.
- Profile editor with username, bio update, profile photo upload, and logout
- **Favorites system** with:
    - Add/Remove buttons per movie
    - Full render in `My Favorites` tab
- **Vendor-exclusive views**:
    - **My Theatres** Dashboard
- **Theatre management** with individual theatre pages
    - UI for **screen design** with row/column seat grid (gap selector)

---

### Backend & API Features

- Modular Express server and routing with controllers
- MongoDB with Mongoose, including schemas for Users, Cities, Theatres, Movies
- JWT-based auth and role management (user, vendor)
- Nodemailer-based email verification and password reset sequence
- Persistent image uploads for user profiles and movie posters
- City Schema with nested Theatre and Screen structure
- Enhanced query filtering and performance for films with title/genre search

---

### Events & Movies Section

- Real-world dataset of 9,800+ film entries
- Poster references stored and resolved to local storage
- Genre filter with multi-select enabled
- Debounced search input to limit backend load
- Dynamic movie details page by ID
- Displays if film is a favorite (checks dynamically per user)

---

### User Experience & Design

- Simple and icon-based navbar
- Replaced "My Account" text with profile icon
- Live favorite system with toggle and visual feedback
- Responsive design with clear typography
- Vendor-specific views only accessible to authenticated vendors
- Planned vendor support for dynamic seat configurations per theatre/screen

---

## Tech Stack

**Frontend**
- Vue.js 2
- Vuex
- Vue Router
- Axios

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB Compass / Atlas

**Testing**
- Postman (Manual API Testing)

---
