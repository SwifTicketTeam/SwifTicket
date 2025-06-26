# SwifTicket API Documentation

---

## API Routes

``` 

GET     /                                 → Server root
GET     /api                              → API landing/documentation page

POST    /api/auth/register                → Register new user
POST    /api/auth/login                   → Login
GET     /api/auth/verified                → Verify email by token
POST    /api/auth/forgot-password         → Request password reset
POST    /api/auth/reset-password          → Reset password
POST    /api/auth/jwt                     → Validate JWT session

POST    /api/uploads/images/users/\\:userid → Upload profile photo of user
GET     /api/uploads/images/users/\\:userid → Fetch profile photo of user
PUT     /api/account/users/:userid        → Modify user information

GET     /api/events/movies                → Retrieve list of movies
POST    /api/account/favorites            → Retrieve list of favorite movies
POST    /api/events/movies/users/favorites → Check if movie is in favorites
PUT     /api/events/movies/users/favorites → Add/Remove movie from favorites

```

---
## API Endpoint Documentation

---
### Root

### GET `/`

Returns the server status or welcome message.

---
### API Landing

### GET `/api`

Returns the API landing documentation in Markdown or HTML format.

---
## Authentication

### POST `/api/auth/register`

Registers a new user.

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

---
### POST `/api/auth/login`

Logs in the user.

**Request Body:**

```json
{
"email": "john@example.com",
"password": "your_password"
}
```
---

### GET `/api/auth/verified`

Verifies email with token.

**Behavior:**

* Redirects to login if token is valid and verified
* Redirects to error page if token is invalid or expired

---

### POST `/api/auth/forgot-password`

Triggers password reset by email.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### POST `/api/auth/reset-password`

Resets password using supplied token.

**Request Body:**

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### POST `/api/auth/jwt`

Verifies JWT token and provides user session information.

**Request Body:**

```json
{
  "token": "jwt_token_here"
}
```

**Response:**

```json
{"}
"username": "john_doe",
  "email": "john@example.com",
  "role": "user"
}

---

## Profile Photo

### POST `/api/uploads/images/users/:userid`

Uploads a profile photo.

**FormData:**

* `userProfilePhoto`: image file (.jpg, .jpeg, .png)
* `token`: JWT token

**Response:**

```json
{
  "message": "Profile Photo Uploaded Successfully"
}
```

---

### GET `/api/uploads/images/users/:userid`

Retrieves the user's profile photo (image/* MIME type).

---

## Account Management

### PUT `/api/account/users/:userid`

Updates user details.

**Request Body:**

```json
{
  "username": "new_username",
  "email": "new_email",
  "bio": "updated bio"
}
```

**Response:**

```json
{
  "message": "User details updated successfully"
}
```

---

## Movie Listing

### GET `/api/events/movies`

Returns a list of movies with optional filtering.

**Query Parameters:**

* `search`: optional title search string
* `genre`: optional comma-separated list of genres

**Example:**

```
/api/events/movies?search=batman&genre=Action,Adventure
```

---

## Favorites System

### POST `/api/account/favorites`

Retrieves the list of a user's favorite movies.

**Request Body:**

```json
{
  "userId": "user_id_here"
}
```

**Response:**

```json
{
  "message": "Ticket Added to Favorites"
}
```

---

### POST `/api/events/movies/users/favorites`

Determines if a movie is a favorite for a specific user.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "movieId": "movie_id_here"
}
```

**Response:**

```json
{
  "isFavorite": true
}
```

---

### PUT `/api/events/movies/users/favorites`

Adds or removes a movie from a user's favorites.

**Request Body:**

```json
{
  "userId": "user_id_here",
  "movieId": "movie_id_here"
}
```

**Response:**

```json
{
  "message": "Event Updated to Favorites"
}
```

---