# SwifTicket API Documentation

All RESTful API endpoints used across the SwifTicket platform.

---

## Server & Documentation

### `GET /`
Returns the welcome message or status of the server.

---

### `GET /api`
Returns a basic landing page or the Markdown API documentation itself.

---

## Authentication

### `POST /api/auth/register`
Registers a new user.

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password"
}
````

---

### `POST /api/auth/login`

Logs in the user.

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password"
}
```

---

### `GET /api/auth/verified?token=xyz`

Verifies email with token from query string.

---

### `POST /api/auth/forgot-password`

Initiates password reset.

**Body:**

```json
{
  "email": "john@example.com"
}
```

---

### `POST /api/auth/reset-password`

Resets password using token.

**Body:**

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### `POST /api/auth/jwt`

Validates a JWT and returns session info.

**Body:**

```json
{
  "token": "jwt_token"
}
```

---

## User Profile

### `POST /api/uploads/images/users/:userid`

Uploads user profile image.

**FormData Fields:**

* `userProfilePhoto`: Image File
* `token`: JWT

---

### `GET /api/uploads/images/users/:userid`

Fetches uploaded user profile image.

---

### `PUT /api/account/users/:userid`

Updates user profile information.

**Body:**

```json
{
  "username": "new_name",
  "email": "new_email",
  "bio": "new bio"
}
```

---

## Movies & Events

### `GET /api/events/movies`

Fetches list of movies.

**Query Parameters (optional):**

* `search`: Title search
* `genre`: Comma-separated genre list

---

### `POST /api/events/movies/screens`

Fetches list of screens and showtimes for a movie.

**Body:**

```json
{
  "movieId": "movie_id",
  "date": "YYYY-MM-DD"
}
```

---

## Favorites System

### `POST /api/events/movies/users/favorites`

Checks if a movie is in user's favorites.

**Body:**

```json
{
  "userId": "user_id",
  "movieId": "movie_id"
}
```

**Response:**
`true` or `false`

---

### `POST /api/account/movies/favorites`

Fetches all favorite movies of a user.

**Body:**

```json
{
  "userId": "user_id"
}
```

---

### `PUT /api/account/movies/favorites`

Adds or removes movie from favorites.

**Body:**

```json
{
  "userId": "user_id",
  "movieId": "movie_id"
}
```

---

## Vendor: Theatre Management

### `POST /api/account/theatres/create`

Creates a theatre for a vendor.

**Body:**

```json
{
  "vendor": "vendor_id",
  "city": "City Name",
  "name": "Theatre Name"
}
```

---

### `POST /api/account/theatres/get`

Returns all theatres of a vendor.

**Body:**

```json
{
  "vendor": "vendor_id"
}
```

---

## Vendor: Screen Management

### `POST /api/account/theatres/screens/create`

Creates a new screen.

**Body:**

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

### `POST /api/account/theatres/screens/get`

Returns screens for a given theatre and city.

**Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name"
}
```

---

### `POST /api/account/theatres/screen/delete`

Deletes a screen.

**Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name",
  "screenName": "Screen 1"
}
```

---

## Vendor: Movie Assignment

### `GET /api/account/theatres/movies`

Returns movies available to assign to screens.

---

### `POST /api/account/theatres/movie`

Assigns a movie to a screen with time.

**Body:**

```json
{
  "city": "city_name",
  "theatre": "theatre_name",
  "screenName": "Screen 1",
  "movieId": "movie_id",
  "time": "HH:mm"
}
```

---

## Payments & Checkout

### POST `/api/payments/init`

Starts the Stripe Checkout session for the booking process.

```js
{
  amount: this.bookAmount * 100,
  email: this.$store.state.auth.email,
  metadata: {
    user: this.$store.state.auth.UID,
    movie: this.evt.title,
    movie_id: this.evt._id,
    seats: [...this.selectedSeats].sort().join(', '),
    theatre: `${this.selectedScreen.theatre}, ${this.selectedScreen.city}`,
    show: this.selectedShow.name,
    time: this.selectedShow.time,
    amount: this.bookAmount * (1 + this.ConvenienceFeesPercentage)
  }
}
```

Request Body Sample:

```js
{
  "amount": 35000,
  "email": "user@example.com",
  "metadata": {
    "user": "user_id_123",
    "movie": "Movie Title",
    "movie_id": "movie_id_abc",
    "seats": "A1, A2",
    "theatre": "Grand Cinema, Mumbai",
    "show": "Evening Show",
    "time": "18:30",
    "amount": 350
  }
}
```

POST /api/payments/success?session_id=xyz

Triggered after successful Stripe checkout. Retrieves ticket metadata from Stripe session.

Response Sample:

```js
{
  "metadata": {
    "user": "user_id_123",
    "movie": "Movie Title",
    "movie_id": "movie_id_abc",
    "seats": "A1, A2",
    "theatre": "Grand Cinema, Mumbai",
    "show": "Evening Show",
    "time": "18:30",
    "amount": 350
  }
}
```
---