# SwifTicket API Documentation

---

## API Routes

```
GET     /                                         → Server root
GET     /api                                     → API landing/documentation page

POST    /api/auth/register                       → Register new user
POST    /api/auth/login                          → Login
GET     /api/auth/verified                       → Email verification through token
POST    /api/auth/forgot-password                → Forgot password request
POST    /api/auth/reset-password                 → Reset password
POST    /api/auth/jwt                            → Validate JWT session

POST    /api/uploads/images/users/:userid        → Upload user profile photo
GET     /api/uploads/images/users/:userid        → Get user profile picture
PUT     /api/account/users/:userid               → Edit user information

GET     /api/events/movies                       → Get movie list (with filters)
POST    /api/events/movies/screens               → Get screens showing a specific movie
POST    /api/events/movies/users/favorites       → Whether movie is in favorites
PUT     /api/account/movies/favorites            → Add or Remove movie from favorites
POST    /api/account/movies/favorites            → Get all favorite movies

POST    /api/account/theatres/create             → Create a theatre (vendor only)
POST    /api/account/theatres/get                → Get all theatres by vendor

POST    /api/account/theatres/screens/create     → Create a screen under a theatre
POST    /api/account/theatres/screens/get        → Get all screens under a theatre
POST    /api/account/theatres/screen/delete      → Delete a screen

GET     /api/account/theatres/movies             → Get list of movies for vendor selection
POST    /api/account/theatres/movie              → Assign a movie and showtime to a screen
```

---

## API Endpoint Documentation

---

### Root

#### GET `/`

Returns the server status or welcome message.

---

### API Landing

#### GET `/api`

Returns the API documentation in Markdown or HTML format.

---

## Authentication

---

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

### GET `/api/auth/verified?token=`

Validates email verification token.

---

### POST `/api/auth/forgot-password`

Sends password reset email.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### POST `/api/auth/reset-password`

Resets user password with a valid token.

**Request Body:**

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### POST `/api/auth/jwt`

Validates JWT token and returns session info.

**Request Body:**

```json
{
  "token": "jwt_token_here"
}
```

---

## Profile Management

---

### POST `/api/uploads/images/users/:userid`

Uploads user profile photo.

**FormData:**

* `userProfilePhoto`: image file
* `token`: JWT token

---

### GET `/api/uploads/images/users/:userid`

Returns user profile photo (image MIME type).

---

### PUT `/api/account/users/:userid`

Updates user information.

**Request Body:**

```json
{
  "username": "new_name",
  "email": "new_email",
  "bio": "updated bio"
}
```

---

## Movies

---

### GET `/api/events/movies`

Returns list of movies with optional filtering.

**Query Parameters:**

* `search`: (optional) movie title
* `genre`: (optional) comma-separated genres

---

### POST `/api/events/movies/screens`

Returns all screens showing a specific movie on a selected date.

**Request Body:**

```json
{
  "movieId": "movie_id",
  "date": "YYYY-MM-DD"
}
```

---

## Favorites System

---

### POST `/api/events/movies/users/favorites`

Checks if a movie is favorited by a user.

**Request Body:**

```json
{
  "userId": "user_id",
  "movieId": "movie_id"
}
```

**Response:** `true` or `false`

---

### PUT `/api/account/movies/favorites`

Adds or removes a movie from user's favorites.

**Request Body:**

```json
{
  "userId": "user_id",
  "movieId": "movie_id"
}
```

---

### POST `/api/account/movies/favorites`

Fetches all favorite movies for a user.

**Request Body:**

```json
{
  "userId": "user_id"
}
```

---

## Vendor: Theatre Management

---

### POST `/api/account/theatres/create`

Creates a theatre in a city.

**Request Body:**

```json
{
  "vendor": "vendor_id",
  "city": "City Name",
  "name": "Theatre Name"
}
```

---

### POST `/api/account/theatres/get`

Returns all theatres owned by a vendor.

**Request Body:**

```json
{
  "vendor": "vendor_id"
}
```

---

## Vendor: Screen Management

---

### POST `/api/account/theatres/screens/create`

Creates a screen with seat layout under a theatre.

**Request Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name",
  "screenName": "Screen 1",
  "rows": 6,
  "cols": 12,
  "gaps": [[1, 3], [4, 5]]
}
```

---

### POST `/api/account/theatres/screens/get`

Returns all screens for a specific theatre and city.

**Request Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name"
}
```

---

### POST `/api/account/theatres/screen/delete`

Deletes a screen.

**Request Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name",
  "screenName": "Screen 1"
}
```

---

## Vendor: Movie Assignment

---

### GET `/api/account/theatres/movies`

Returns movie list for selection (vendor use).

---

### POST `/api/account/theatres/movie`

Assigns a movie with showtime to a screen.

**Request Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name",
  "screenName": "Screen 1",
  "movieId": "movie_id",
  "time": "HH:MM"
}
```

---