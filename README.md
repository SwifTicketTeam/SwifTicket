# SwifTicket – Universal Ticketing Platform

SwifTicket is a cross-industry ticket booking full-stack solution developed with Vue.js, Node.js, and MongoDB. It includes authentication, profile management, vendor dashboards, event discovery, booking flows, and real-time payment integrations. The platform integrates real-world movie data and is designed on a scalable, city-based model for multi-theatre and screen operations.

---

## Project Roadmap

- Phase 1: Frontend Foundation
- Phase 2: Backend Server Setup and API Integration
- Phase 3: Custom Database and Authentication
- Phase 4: JWT Session Management and Email Messaging
- Phase 5: Session Confirmation and Events Page Design
- Phase 6: My Account Tab and Movie Page Routing
- Phase 6 Extended: Persistent Storage and API Docs
- Phase 7: Integration of Movie Dataset & Profile Enhancement
- Phase 8: Filtering, Search & Dynamic Routing
- Phase 9: Favorites Feature & UI Re-design
- Phase 10: Ticket Booking Base and City Support
- Phase 11: Vendor Panel, Theatre Management, and Screens
- Phase 12: Showtime Assignment, Seat Booking, and Stripe Checkout

---

## Project Overview

### Frontend Features

- Vue.js and Flexbox-based responsive UI
- Dynamic routes (`/`, `/home`, `/account`, `/event`, `/showtime`, etc.) handled by Vue Router
- Vuex-driven state management for session, auth, favorites
- Seamless route transitions, conditional navigation, and guarded routes
- My Account tab with profile editing, favorites, security, and role swapping
- Real-time favorite system with local storage and server storage persistence
- Vendor Dashboard:
  - Create the theatres and allocate to cities
  - Add screens with customized layout (rows, columns, gaps between seats)
  - Map movies to screens using MovieCard interface
- Seat selection and deselection for the users
- Booking interface with screen-wise time slots under selected movie and date
- Stripe Checkout integrated for secure payment
- Ticket summary displayed after payment with QR code generated

---

### Backend & API Features

- Modular controllers for Express.js backend
- Schemas for MongoDB:
  - `User`, `UserDetails`, `City`, `Movie`, `Theatre`, `Screen`, `Booking`
- JWT authentication
- Support for Nodemailer:
  - Email verification
  - Reset/forgot password
- Support for upload of profile pictures and movie posters
- Properly named and documented RESTful API
- Movies queryable by title and genre through MongoDB queries
- Favorite movies saved per user and accessible at any time
- Preview and save layout for screen design
- Stripe integration:
  - Checkout session
  - Ticket confirmation and redirect

---

### Events & Booking System

- Live movie dataset with 9,800+ records
- Poster assets managed and mapped locally
- Genre chips and debounced search on `/events` page
- Dynamic movie detail route
- Filtered movie view with tag for "Currently Showing"
- User can book tickets by:
  - Choosing movie → date → screen & time → seats
  - Checkout using Stripe
- Ticket confirmation with QR

---

### Design & UX

- Soft borders and unified color scheme:
  - Salmon red (`rgba(240, 128, 128, 0.75)`)
  - Yellow accent (`#ffc94d`)
- Personalized transitions and layout retention through Vue's `keep-alive`
- Form validation, toast, and async feedback built in
- Role-based navigation:
  - Vendor access to theatre management only
- Clear visual hierarchy and minimalist cards
- Seat layout view matches actual seat plan with responsive grid

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
- Postman (API Testing)
- Nodemailer (Email Services)
- Stripe (Payment Gateway)

---

## Current Limitations

- Booked tickets are not saved to database yet
- Admin Panel and reporting tools not yet integrated
- Movie queuing system left pending for future releases

---

## License

MIT
