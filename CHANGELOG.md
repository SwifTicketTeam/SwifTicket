# Changelog – SwifTicket

## [Pre Beta v0.0] - June 18 2025

### Phase 1 – Frontend Foundation

- Created `Auth.vue` as the main container component for handling authentication
- Developed `Login.vue` and `Register.vue` as dynamic components within `Auth.vue`
- Implemented query-based component switching between login and signup views
- Designed `Card.vue` to serve as a switcher UI and branding information section
- Built responsive layout using Flexbox principles for mobile-first support
- Established a clean and reusable modular Vue component structure
- Added "Forgot Password" and "Submit" buttons to enhance form completeness
- Unified the visual design of `Login.vue` and `Register.vue` by extracting shared styles into an external CSS file to maintain consistency and reduce redundancy


## [Beta v0.0] – June 19, 2025

### Phase 2 – API Testing and Backend Server Integration

- Integrated Postman for API testing and simulation
- Simulated user registration and login using mock APIs
- Implemented pre-request scripts for email uniqueness validation
- Added environment and collection variables in Postman
- Established basic request/response lifecycle understanding
- Explored user authentication flows and error handling

### Phase 3 – Custom Backend and Database Integration

- Set up a Node.js and Express.js server with RESTful API routes
- Connected MongoDB using Mongoose ORM
- Created `User` model with validations and schema constraints
- Added password hashing using `bcrypt` during registration
- Implemented JWT-based token generation on login
- Stored tokens in HTTP-only cookies for secure session management
- Established backend route handlers for `/register`, `/login`
- Validated duplicate emails via MongoDB unique index and error handling
- Connected frontend Vue components to backend API using Axios
- Enabled full end-to-end registration and login flow
