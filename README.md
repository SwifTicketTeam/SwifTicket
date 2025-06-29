# SwifTicket – Universal Ticketing Platform

SwifTicket is a universal ticket booking full-stack platform built with Vue.js, Node.js, and MongoDB. It features basic user authentication, profile management, event surfing, and movie discovery functionalities. The platform is supported by a real-world dataset of movies and optimized for responsiveness using debounced search, genre filtering, and dynamic routing.

---

## Project Roadmap

- Phase 1: Frontend Development
- Phase 2: API Integration and Backend Server Setup
- Phase 3: Custom Authentication and Database
- Phase 4: Email Messaging and JWT Session Management
- Phase 5: Session Verification and Events Page Layout
- Phase 6: My Account Tabs and Movie Page Routing
- Phase 6 Extended: Persistent Storage and API Docs
- Phase 7: Movie Dataset Integration & Profile Improvement
- Phase 8: Search, Filtering & Dynamic Routing
- Phase 9: Favorites System & UI Redesign
- Phase 10: Ticket Booking Base and City Support
- Phase 11: Vendor Panel, Theatre Management, and Screens

---

## Project Overview

### Frontend Features

- Redesign of the whole UI with a responsive, clean layout
- Smooth navigation with transition animation and route guards
- Full integration of Vue Router with dynamic routes (`/`, `/home`, `/account`, `/event`, `/reset-password`, `/showtime`)
- Vuex-based global state management for authentication and user session storage
- Profile editor with upload of profile picture, username, bio, and logout
- Favorites system:
  - Add/Remove buttons on every movie
  - Persistent storage and full list view in **My Favorites**
- Vendor Dashboard:
  - Vendor-only access to **My Theatres**
  - Ability to add new theatres with city and name
  - Dropdown menu to select from many existing cities
- Theatre Management:
- See all owned theaters with visual layout
  - See all screens under every theatre
  - Allocate movie to every screen using MovieCards
  - Movie allocation gets refreshed in real-time
    -Screen Layout Editor:
  - UI to insert screens with name, rows, columns, and seat gaps
  - Real-time visual layout preview during insertion
- Preview renderer for screens with capability to also show saved database layout
- Screen deletion capability

---

### Backend & API Features

- Clean MVC-structured Express.js modular server
- Mongoose and MongoDB, with schemas structured as follows:
  - `User`, `UserDetails`, `City`, `Movie`, and `Screen`
- Secure JWT-based authentication with access roles (User, Vendor)
- Integration of Nodemailer for:
  - Verification emails
  - Password reset emails
- Persistent image uploads:
- Profile picture support
  - Poster mapping for films
- City Schema:
  - Allows for multiple cities
  - Multiple theatres in each city, with subdocuments for screens
- Fully-documented REST API with naming conventions
- Title-based and genre-based search with MongoDB queries
- Aggregation pipelines utilized for efficient search/filter
- Favorite system incorporated and saved as part of user document
- Logic tied to assignment of movies for each theatre and vendor

---

### Events & Movie System

- 9,800+ real-world movie dataset
- Posters kept locally and queried in MongoDB
- Filtering by genre with multi-select chips
- Debounced search with async querying
- Single movie detail page with route-based view
- Favorites toggle exposed on every movie, showing current state

---

### Design & UX

- Navigation bar employs icons and new logo
- "My Account" section cleansed with profile icon
- Vendor-only panels and forms concealed from regular users
- Action visual feedback (favorites, layout preview, movie update)
- Single theme with soft borders (`#CCC`) and transition styling
- Persistent UI state and rendering optimization for layout previews

---

## Tech Stack

### Frontend
- Vue.js 2
- Vuex
- Vue Router
- Axios

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas / Compass

### Tools & Testing
- Postman (API testing)
- Nodemailer (email services)

---