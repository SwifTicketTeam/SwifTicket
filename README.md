# SwifTicket – Cross-Industry Universal Ticketing Platform

SwifTicket is a full-stack, cross-industry movie ticket booking solution built with Vue.js, Node.js, and MongoDB. It features authentication, profile management, vendor dashboards, event discovery, booking flows, and real-time payment integrations. The platform integrates actual movie data and is built on a scalable, city-based model for multi-theatre and screen operations.

Website: https://swifticket-web.vercel.app
- Frontend - **Vercel**
- Backend (Server + API) - **Render**
- Database - **MongoDB Atlas**
- Cloud Storage - **Cloudinary**
---

## Project Roadmap

- Phase 1: Frontend Foundation
- Phase 2: API Testing and Backend Server Integration
- Phase 3: Database and Authentication
- Phase 4: JWT Session Management, Email Messaging, and Forgot Password
- Phase 5: Events Page Layout, Session Verification, and Visual Enhancements
- Phase 6: My Account Tab, Transitions, and Movie Page Routing
- Phase 6 Extended: Storage, Persistence, API Docs, and Restructure
- Phase 7: Profile Enhancement & Movie Dataset Integration
- Phase 8: Discovery Engine Activation, Search, Filter & Dynamic Routing
- Phase 9: Favorites System & UI Overhaul
- Phase 10: Ticket Booking Foundations & City Support Added
- Phase 11: Screen System Launched & Vendor Management
- Phase 12: Booking UI, Showtime Selection, & Layout Improvements
- Phase 12 Extended: Seat Booking, Stripe Payments, and Ticket Generation Implemented
- Phase 13: Schema Refactor, Ticketing Flow Complete
- Phase 14 - First Deployment of SwifTicket
- Phase 15 - Implementing Better UX Changes

---

## Project Overview

### Frontend Features

- Vue.js and Flexbox-based responsive UI
- Dynamic routes (`/`, `/home`, `/account`, `/events`, `/showtime`, etc.) managed by Vue Router
- Vuex-state-managed session, auth, favorite state
- Smooth route transition, conditional nav, and guarded routes
- My Account tab with editing profile, favorites, security, and role change
- Real-time favorite system with local and server-side persistence
- Vendor Dashboard:
  - Create theatres and assign to cities
  - Add screens with custom layout (rows, columns, and gaps)
- Map movies to screens through an easy-to-use card interface
- User preview, deselection, and selection of seats
- Integration of Stripe Checkout for payment security
- Confirmation screen for tickets with QR code generation
- My Tickets tab listing all reserved tickets including showtime, seats, and movie details

--- 

### Backend & API Features

- Express.js backend with modularity in controllers
- MongoDB with schemas fully normalized:
  - `City`, `Theatre`, `Screen`, `Seat`, `User`, `Movie`, `MovieTicket`
- JWT authentication and role-based authorization
- Integration of Nodemailer for:
  - Email verification
  - Password reset
- Support for uploading profile pics and movie posters
- RESTful API endpoints with named and documented structure
- Integration of Stripe for payments and ticket creation
- Ticket system with use of metadata to guarantee transactional booking
- My Tickets saved in `MovieTicket`, pointing to ticket and movie metadata

---


### Events & Booking System

- 9,800+ authentic movie records with local poster mapping
- Filtering by genre and debounced search
- Dynamic routing for movie detail pages
- "Currently Showing" tag for live shows
- Seat layout reflects real-time availability
- Book tickets by:
  1. Picking a movie, date, and screen
  2. Picking available seats
  3. Paying securely through Stripe
  4. Displaying the booking summary and QR code
  5. Ticket QR codes are scannable and lead directly to the booked ticket details page.
- Blocked seats remain in the DB and update immediately

---

### Design & UX

- Light color palette with:
  - Salmon red (`rgba(233, 106, 106)`)
  - Golden yellow (`#FFFC94D`)
- Card-like layout with minimal shadows
- Responsive grid layout for seat maps
- Simple navigation by user roles
- `keep-alive` for layout state management and seamless UX
- Toast notifications, async loading states, and route guards

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

### Tools & Services
- Postman
- Nodemailer
- Stripe

---

## Current Limitations

- Admin analytics and reporting dashboard not implemented
- Movie queuing system and show scheduler not built yet

---

## License

MIT
