# Changelog – SwifTicket

All notable changes to this project are documented here.

---

## Pre Beta v0.0 – June 18, 2025

### Phase 1 – Frontend Foundation

- Created `Auth.vue` as the main container component for authentication
- Developed `Login.vue` and `Register.vue` with toggle logic and shared form structure
- Built `Card.vue` for branding and switchable layout
- Achieved a responsive UI with Flexbox
- Unified styles between login and register forms using a shared stylesheet
- Added “Forgot Password” and submit functionalities to both forms
- Established modular and reusable Vue component architecture

---

## Beta v0.0 – June 19, 2025

### Phase 2 – API Testing and Backend Server Integration

- Developed backend with Node.js and Express.js
- Connected frontend using Axios for `/` and `/events` routes
- Integrated Postman for API testing using real server endpoints
- Removed mock API; tested with actual backend functionality
- Configured MongoDB Atlas with Mongoose

---

### Phase 3 – Database and Authentication

- Implemented `User` schema with validation (username, email, password)
- Hashed passwords using `bcrypt`
- JWT-based authentication for login implemented
- Tokens persisted in **Vuex and localStorage** (not cookies)
- Duplicate email errors handled using MongoDB unique indexing
- Full registration and login flow completed

---
## Beta Extended v0.0 – June 19, 2025

### Phase 4 – JWT Session Management, Email Messaging, and Forgot Password (In Progress)

- JWT-based session creation done
- Integration of Nodemailer for sending:
  - Welcome emails upon registration
  - Password reset emails through secure link
- Setup of reset password form UI and endpoint routing for it started
- Basic version of forgot password feature implemented
- Generation of link logic added
- Placeholder logic for password update on reset route

---

## v0.0 – June 20, 2025

### Phase 4 – Forgot Password Done and Bug Fixes

- Finished the complete **Forgot Password** workflow:
  - Confirmed user email
  - Sent password reset email with secure reset link
  - Reset link now contains **JWT token with expiry** for safety
  - Password updated on confirmation through reset page
- Utilized `jwt.verify()` to validate and extract token payload
- Enhanced server response and error messaging for invalid/expired tokens
- Fixed token decoding bugs and streamlined reset-password route logic
- Completed form and messaging for successful password change

---

## Pre Beta v0.1 – June 21, 2025
> **Note**:
> OAuth and Role-Based Route Protection have been delayed. Route Protection is pending vendor/admin page structures definition.

### Phase 5 – Events Page Layout, Session Verification, and Visual Enhancements

- Included official SwifTicket logo for Branding
- Bugs in the login system fixed for more trustworthy authentication flow
- Implemented `Events` page structure with a structured header and a search bar
- Added JWT session validation on every login
  - Sent validated user information (username, email, and role) to Vuex state
  - Keeps session state as token is valid
- Redirected logged-in authenticated users to the `Events` page
- Added a `Dashboard` button on the `Events` page for quick access
- Developed a `verification-error` page to smoothly catch invalid email token verification attempts
  - Avoids backend `/verify` route hanging or looping
- Enhanced responsive design and legibility on all pages by streamlining text scaling and layout

---

## Beta v0.1 – June 22, 2025

### Phase 6 – My Account Tab, Transitions, and Movie Page Routing

- Added `My Account` tab with:
  - Profile
  - Transaction History
- My Tickets
- Favorites
- Security
- Conditional options:
  - User: "Become a Vendor"
  - Vendor: "Manage Events"
- Added authentication re-verification prior to page loading and route switching for added security
- Added global transition fade effects on rerouting
- Added `/event` route activated by clicking on an event card
- Has a back button to go back to Events List
- Constructed Profile display with:
  - Profile image (Won't persist on exiting the My Account Tab)
  - Username
  - Email address

*Note:* Versioning is still continued from Beta since now features are stable. Subsequent release can start OAuth and Vendor Panel integrations.

## Beta Extended v0.1 – June 23, 2025

### Phase 6 Extended – Storage, Persistence, API Docs, and Restructure

- Added **Storage** to store files between sessions and devices
- Profile picture is now **remembered between page refreshes, sessions, and devices**
- Project's **file/folder structure** was reorganized for ease of use and scalability
- Included an **API documentation page** describing all backend routes and how they should be used
- Updated various `GET` and `POST` API endpoints for consistency and RESTful principles

## Beta Polished v0.1 – June 24, 2025

### Phase 7 – Profile Enhancement & Movie Dataset Integration

- Polished Profile Picture support:
  - Gracefully handled errors (upload errors, invalid formats, etc.)
  - Stored uploaded image across sessions and devices

- Expanded Profile Info:
  - Included display for Bio, Role, and UID
  - Enabled editing for input of Username and Bio

- Events Page Upgrade:
- Implemented with **Pablinho Movie Dataset**
  - Imported all **9,826 movie posters** to local storage
  - Inserted movie data and referenced poster in MongoDB

## v0.1 – June 24, 2025

### Phase 8 – Discovery Engine Activation, Search, Filter & Dynamic Routing

- Home Page now dynamically shows movies from MongoDB dataset
- Added dynamic routing for each movie to its own detail page:
- Adds working Back button
- "Book Now" and "Favorite" buttons implemented (temporarily non-functional)
- Added Debounced Search:
  - Delays input by 400ms before sending API
  - Avoids spamming the server with requests and enhances speed
- Added Genre Filters:
  - Allows multi-select genre-based filtering of films
- Added Logout Functionality:
  - Removes session and resets application state
- Added first **Theatre Schema** to enable scalable layout and screen mapping
  - Simple layout with rows and movieSeat types
  - Streamlined structure for future testing and movieSeat selection logic
---

## v0.2 – June 25, 2025

### Phase 9 – UI Overhaul and Favorites System

- Refurbished the UI with updated styling and new logo
- Replaced "My Account" button with profile icon
- Removed "Virtual" genre from film filters for a purer experience
- Allowed favoriting from movie cards
- Introduced a new **Favorites** tab within the Account section
  - Favorites are **loaded upon open** but not yet rendered in the UI
---

## Pre Beta v0.3 – June 27, 2025

### Phase 10 – Ticket Booking Foundations & City Support

- Introduced **Favorites rendering** in the UI within the Account section
- Included **Add/Remove Favorite** buttons on every movie card (user-specific)
- Developed **basic booking outline** under the `/booking` route
- Included UI for **Add Theatres** through Manage Events
- Developed new **City Schema** to facilitate multi-city venue storage
- Updated the `UserDetails` schema to accommodate favorite movie tracking and role improvements
- Included `keep-alive` in Express routes for enhanced session handling and performance
- Refactored API routes for maintainability and scalability enhancements

---
> **Note:**
> _v0.3 will finalize the foundation of the movieTicket booking system and implement fully operational, user-defined Favorites functionality._

---

## Beta v0.3 – June 28, 2025

### Phase 10 – Vendor Panel & Theatre Management

- Implemented **vendor-exclusive** functionality:
  - Added **My Theatres** tab and an **Add Theatre** button requesting City and Theatre Name
  - Built **Manage Theatres** panel displaying all theatres belonging to the logged-in vendor
- Integrated per-theatre UI with placeholder for **existing screens view**
- Added **Screen Adding UI**:
- Vendors can title the screen and assign rows/columns
- Manual gap selection or whole rows/columns are supported
- (Note: Backend logic for movieSeat layout and screen saving still to be implemented)
- Renamed `/booking` route to more intuitive `/showtime`
- Updated route styling: changed all input borders from `#000` to `#CCC`

---

> Note: This step lays the foundation for vendor-side management and opens the door to dynamic movieSeat layout logic in future updates._

---

## v0.3 - June 29, 2025

### Phase 11 - Vendor Management & Screen System Launched
- Vendor-specific city selector to create theatres
- Support for multiple cities included in database for hosting more events
- Backend to create screens with stored layout data saved in the database
- Dynamic visualization of seats when creating screens, with row/column and gap options
- Option to see all screens for each theatre in the vendor dashboard
- Implemented MovieCard system for vendors to allocate movies to their cinemas
- Updates movie assignment immediately after the selection
- Preview Layout component developed:
  - Utilized to display and emulate saved screen layout from database
  - Can be reused in the future for preview and real-time parsing of layout
- Delete screen option without confirmation handling

---

> Note: Showtime scheduling, screen-time mapping, and movieSeat reservation flow will be implemented in version next.  
Version `v0.4` and its sub-versions will finish up the entire movieTicket booking flow from timing, movieSeat locking to payment integration.

---

## Beta v0.4 - June 30, 2025

### Phase 12 - Showtime Selection, Booking UI & Layout Improvements
- Vendors are able to choose a time while selecting movies for their screens
- "Currently Showing" label introduced for live movies, separated visually in `/events`
- Vendors are able to delete the movie currently showing on a screen with warning
- New movie assignment workflow introduced with validation and new UI
- Structure of booking screen included with:
- Title of movie and five dates that are selectable (today + subsequent 6 days)
  - Screens grouped by theatre under chosen date and movie
  - Each screen shows its respective showtime
- Layout piece now shows the screen name and details over the movieSeat grid
- Delete screen functionality now has confirmation handling to prevent unwanted deletions
- Booking UI added:
  - Screens and layouts are selectable
- "Book Now" and true movieTicket reservation logic to be implemented

---

> Note: Movie queuing and full movieSeat reservation flow will be completed in `v0.4`.
Booking feature like movieSeat selection, lock, and confirmation is being actively developed.

---

## Beta Extended v0.4 - July 1, 2025

### Phase 12 – Seat Booking, Stripe Payments, and Ticket Generation
- Seat choice and unchoice completed with interactive layout
- "Book Now" now directs to Stripe-enabled payment checkout
- Summary page displays chosen seats, timing, and price prior to payment
- Automatic refresh for "Currently Showing" movies according to vendor assignments
- Stripe integration with redirection to movieTicket summary and QR generation after payment
- Ticket QR code shown after successful payment
- Ticket QR codes are scannable and lead directly to the booked ticket details page.
- Booking page UI revised with salmon red theme and light text
- Bugs in screen rendering and movieSeat management conflicts fixed

---

> Note: Booked movieTicket are not yet persisted in the database.

--- 
## v0.4 - July 1, 2025

### Phase 13 – Schema Refactor, Ticketing Flow Completion

- Completed and normalized all MongoDB schemas for long-term performance and scalability
- Completely reorganized: cities, theatres, screens, seats, users, tickets, and movies in separate collections
- My Tickets page created under user account with view of all past and future bookings
- Booked seats permanently marked and blocked during the selection of seats
- Stripe session successful flow mixed in with DB ticket creation
- Layout system dynamically updates seat statuses in real-time by show

---

> Note: This is the final significant update to the development process. Unless deployment work resumes, SwifTicket's future is in limbo. The version is stable and finished for full user and vendor use, including support for booking, ticket management, and responsive design.

---
### v0.4.1 - July 2, 2025
> Note: This is a minor update focused on bug fixes and stability improvements for v0.4.

- PDF Ticket Inconsistencies and the "SAVE TICKET AS PDF" appearing the PDF have been fixed.
- Tickets in My Tickets now show the upcoming movies before showing the finished movies. Labels have been given accordingly too.
- Fixed Broken "ADD SCREEN" Button
- Minor UI Changes

## v0.5 - July 2, 2025

### Phase 14 - First Deployment of SwifTicket
- Changed Multer Storage Code to Cloudinary Multer Code
- Changed File Paths of Images to Cloudinary
- MongoDB Atlas DB URI Added
- Made Changes to environment variables for deployment

> Note: This is the Initial Deployment of this Project. v0.5.x is completely focused on converting from the LocalHost Server to Web Deployment

### v0.5.1
> Note: Minor Bug Fixes to the Web Deployment.

