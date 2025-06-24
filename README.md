# SwifTicket – Universal Ticketing Platform

SwifTicket is a full-stack universal ticket booking platform developed using Vue.js, Node.js, and MongoDB. It provides seamless user authentication, profile management, event browsing, and movie discovery features. The platform is backed by a real-world movie dataset and optimized for responsiveness with debounced search, genre filtering, and dynamic routing.

---

## Project Overview

### Frontend Features

* Responsive user interfaces for login, registration, dashboard, and profile
* Dynamic routing with route guards and animated page transitions
* Global state management using Vuex for authentication and session persistence
* Organized multi-page structure: `/`, `/home`, `/account`, `/event`, `/reset-password`, and more
* Editable profile section with support for profile image uploads, bio, username updates, and logout

### Backend & API Features
* Modular Express server handling authentication, user data, and image uploads
* MongoDB integration using Mongoose with well-defined schemas and validations
* Defined initial **Theatre Schema** in MongoDB to support seat layouts and screen definitions
* JWT-based authentication system for secure session handling
* Integrated email verification and password reset flows using Nodemailer
* Persistent image uploads with static serving for profile pictures and movie posters
* API documentation route providing details of all available endpoints

### Events & Movies Section

* Linked real-world movie dataset (9,800+ movies) to events system
* Posters downloaded and stored locally with reference mapping in MongoDB
* Live search bar with debounced input to reduce request load
* Multi-select genre filter system to refine movie listings
* Dedicated dynamic pages for each movie with routing and placeholder actions

### User Experience & Design

* Clean, modern UI with transition animations
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

* MongoDB Compass

**Testing**

* Postman (Manual API Testing)

---