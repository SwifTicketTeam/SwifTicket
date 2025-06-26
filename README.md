# SwifTicket – Universal Ticketing Platform

SwifTicket is a complete-stack universal ticket reservation platform built with Vue.js, Node.js, and MongoDB. It offers intuitive user authentication, profile, event browsing, and movie discovery functionality. The platform is supported by a real-world dataset of movies and optimized for responsiveness with debounced search, genre filtering, and dynamic routing.

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
- Phase 10: Ticket Booking Foundation and City Support

---

## Project Overview

### Frontend Features

* Refactored UI layout and navigation structure
* Responsive login, registration, dashboard, and profile interfaces
* Dynamic routing with route guards and animated page transitions
* Global state management with Vuex for authentication and session persistence
* Multi-page structured organization: `/`, `/home`, `/account`, `/event`, `/reset-password`, etc.
* Editable profile section with profile picture upload support, bio, username change, and logout
* Favorites system: movies are favorited and retrieved from server
* Add/Remove Favorite buttons for every movie with visual state feedback
* Manage Events tab added for vendors to add theatres
* Basic ticket booking route `/booking` added with outline UI

### Backend & API Features

* Modular Express server for authentication, user data, and image uploads
* MongoDB integration with Mongoose using proper schemas and validations
* JWT-based authentication system for secure session management
* Integrated email verification and password reset streams with Nodemailer
* Persistent image uploads with static serving for profile images and movie posters
* API documentation route giving information about all available endpoints
* Favorites API routes to fetch and update user-specific movie information
* City schema added to manage theatres by locations
* Keep-alive support on routes for better session performance

### Events & Movies Section

* Associated real-world movie database (9,800+ movies) with events system
* Posters fetched and stored locally with reference mapping in MongoDB
* Live search bar with debounced input to keep request load low
* Multi-select genre filter system to filter movie listings
* Separate dynamic pages for each movie with routing and actions
* Favorite status is dynamically checked and rendered for every user

### User Experience & Design

* Cleaned-up UI with navigation by icons and new logo
* Favorites Tab under My Account for user-specific access
* User role-dependent UI behavior (User or Vendor)
* Modular component-based design and folder organizational structure for easy maintenance
* "My Account" button replaced with a neater profile icon
* Favorites now displayed on open and fully rendered within the interface

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
