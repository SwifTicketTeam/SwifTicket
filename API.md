# SwifTicket API Documentation

## Base URL

```
https://yourdomain.com/api
```

---

## Authentication Routes (`/auth`)

### POST `/auth/register`

Registers a new user.

**Body**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### POST `/auth/login`

Logs in an existing user.

**Body**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### GET `/auth/verified?token=...`

Verifies a user's email using a token from their email.

### POST `/auth/forgot-password`

Sends a password reset link.

**Body**

```json
{
  "email": "john@example.com"
}
```

### POST `/auth/reset-password`

Resets a user password using a reset token.

**Body**

```json
{
  "password": "newPassword123",
  "token": "<reset_token>"
}
```

### POST `/auth/jwt`

Verifies session JWT.

**Body**

```json
{
  "token": "<jwt>"
}
```

---

## Account Routes (`/account`)

### GET `/uploads/images/users/:userId`

Fetch profile photo for a user.

### POST `/uploads/images/users/:userId`

Upload a profile photo (image/png or jpeg, max 1MB).

### PUT `/account/users/:userId`

Change the username of a user.

**Body**

```json
{
  "username": "newUsername"
}
```

### POST `/vendor/request`

Promote a user to vendor.

**Body**

```json
{
  "userId": "<user_id>"
}
```

---

## Movie Favorites Routes (`/account/movies`)

### POST `/movies/favorites`

Get all favorite movies for a user.

**Body**

```json
{
  "userId": "<user_id>"
}
```

### POST `/events/movies/users/favorites`

Check if a movie is in the user's favorites.

**Body**

```json
{
  "userId": "<user_id>",
  "movieId": "<movie_id>"
}
```

### PUT `/movies/favorites`

Add or remove a movie from a user's favorites.

**Body**

```json
{
  "userId": "<user_id>",
  "movieId": "<movie_id>"
}
```

---

## Movies & Discovery (`/events/movies`)

### GET `/movies`

Fetch movies (screening + discovery). Optional query params:

* `search`: movie title prefix
* `genre`: comma-separated genres

### POST `/movies/screens`

Get available screens for a movie.

**Body**

```json
{
  "movieId": "<movie_id>"
}
```

---

## Theatre Management (`/account/theatres`)

### POST `/create`

Create a new theatre. If the city doesn't exist, it's created.

**Body**

```json
{
  "vendorId": "<vendor_id>",
  "city": "Chennai",
  "name": "PVR"
}
```

### POST `/get`

Fetch all theatres for a vendor.

**Body**

```json
{
  "vendorId": "<vendor_id>"
}
```

---

## Screen Management (`/account/theatres/screens`)

### POST `/create`

Create a screen and seats in a theatre.

**Body**

```json
{
  "city": "Chennai",
  "theatre": "PVR",
  "name": "Screen 1",
  "seats": [["A", 1, false], ["A", 2, false], ["A", 3, true]]
}
```

### POST `/get`

Fetch all screens and seats layout of a theatre.

**Body**

```json
{
  "city": "Chennai",
  "theatre": "PVR"
}
```

### POST `/delete`

Delete a screen and its seats.

**Body**

```json
{
  "city": "Chennai",
  "theatre": "PVR",
  "screen": "Screen 1"
}
```

---

## Screen-Movie Assignment (`/account/theatres/movie`)

### POST `/movie`

Set or remove a movie for a screen.

**Body**

```json
{
  "city": "Chennai",
  "theatre": "PVR",
  "screen": "Screen 1",
  "movieId": "<movie_id>",
  "moviePrice": 150,
  "movieTime": "2025-07-01T14:30:00Z",
  "method": "set"
}
```

or

```json
{
  "city": "Chennai",
  "theatre": "PVR",
  "screen": "Screen 1",
  "movieId": "<movie_id>",
  "method": "delete"
}
```

---

## Get Movies for Screen Selection (`/account/theatres/movies`)

### GET `/movies`

Fetch 5 movies randomly or via search query.

Query Params:

* `search`: movie title prefix

---

## Payments (`/payments/init/movies`)

### POST `/init/movies`

Create a Stripe checkout session.

**Body**

```json
{
  "email": "john@example.com",
  "metadata": {
    "user": "<user_id>",
    "ticket_id": "USERID-UNIQUEID",
    "movie": "Inception",
    "movie_id": "<movie_id>",
    "theatre": "PVR",
    "city": "Chennai",
    "show": "Screen 1",
    "time": "2025-07-01T14:30:00Z",
    "seats": "A1, A2",
    "backend_seats": "A-1, A-2",
    "amount": 300
  }
}
```

---

### POST `/success/movies?session_id=...`

Triggered after successful payment to confirm & store ticket and mark seats as booked.

---

## Fetch Tickets (`/account/tickets/movies/:ticketId`)

* `:ticketId` = `"*"` → fetch all
* `:ticketId` = `"USERID-UNIQUEID"` → fetch one

---

## Server Routes

### GET `/`

Returns static `index.html`.

### GET `/api`

Returns static `api.html`.

---