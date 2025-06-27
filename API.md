# SwifTicket API Documentation

---

## API Routes

```

GET     /                                      → Server root
GET     /api                              → API landing/documentation page

POST    /api/auth/register                     → Register new user
POST    /api/auth/login                        → Login
GET    /api/auth/verified                     → Email verification through token
POST    /api/auth/forgot-password              → Forgot password request
POST    /api/auth/reset-password               → Reset password
POST    /api/auth/jwt                          → Validate JWT session

POST    /api/uploads/images/users/\:userid      → Upload user profile photo
GET     /api/uploads/images/users/\:userid          → Get user profile picture
PUT     /api/account/users/\:userid                 → Edit user information

GET     /api/events/movies                         → Get movie list (with filters)
POST    /api/events/movies/users/favorites     → Whether movie is in favorites
PUT     /api/account/movies/favorites          → Add or Remove movie from favorites
POST    /api/account/movies/favorites          → Get all favorite movies

POST    /api/account/theatres/create           → Create a theatre (VR-only)
POST    /api/account/theatres/get              → Get all theatres by vendor

````

---
## API Endpoint Documentation
---

---


### Root


#### GET `/`

Returns the server status or welcome message.

---
### API Landing


#### GET `/api`

Returns the API landing documentation in Markdown or HTML.

---
## Authentication
---

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

**Behavior:**

* Redirects to login if token is valid and verified
* Redirects to error page if token is invalid or invalid

---

### POST `/api/auth/forgot-password`

Triggers password reset email.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### POST `/api/auth/reset-password`

Resets password with a valid token.

**Request Body:**

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### POST `/api/auth/jwt`

Verifies a JWT token and returns session information.

**Request Body:**

```json
{
  "token": "jwt_token_here"
}
```

**Response:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user"
}
```

---

## Profile Photos

---

### POST `/api/uploads/images/users/:userid`

Uploads a profile image.

**FormData:**

* `userProfilePhoto`: Profile image file (`.jpg`, `.jpeg`, `.png`)
* `token`: JWT token

**Response:**

```json
{
  "message": "Profile Photo Uploaded Successfully"
}
```

---

### GET `/api/uploads/images/users/:userid`

Retrieves the user's profile image as `image/*` MIME type.

---

## Account Management

---

### PUT `/api/account/users/:userid`

Updates user information.

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

## Movies

---

### GET `/api/events/movies`

Returns list of movies with optional search and genre filtering.

**Query Parameters:**

* `search`: optional string to search by title
* `genre`: optional comma-separated genres

**Example:**

```
/api/events/movies?search=avengers&genre=Action,Adventure
```

**Behavior:**

* Returns up to 60 movies by relevance

---

## Favorites

---

### POST `/api/events/movies/users/favorites`

Checks whether a movie is in the favorites list for a user.

**Request Body:**

```json
{
  "userId": "user_id_here",
```
"movieId": "movie_id_here"
}

**Response:**

```json
true
```

or

```json
false
```

---

### PUT `/api/account/movies/favorites`

Adds or deletes a movie from favorites.

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

### POST `/api/account/movies/favorites`

Retrieves all favorite movies of a user.

**Request Body:**

```json
{
  "userId": "user_id_here"
}
```

**Response:**

```json
{
  "message": "Ticket Added to Favorites",
  "movies": [
    {
      "_id": "movie_id",
      "title": "Movie Title",
```
"genres": ["Action", "Drama"],
.
}
]

}

---

## Vendor – Theatres

---

### POST `/api/account/theatres/create`

Creates a theatre entry for a vendor in a given city.

**Request Body:**

```json
{
  "vendor": "vendor_id",
  "city": "city_name",
  "name": "theatre_name"
}
```

**Response (Success – new city created):**

```json
{
  "message": "New City with Theatre Added"
}
```

**Response (Success – theatre added to existing city):**

```json
{"}}}
"message": "New Theatre added to city_name"
```

**Response (Failure – duplicate theatre):**

```json
{
  "message": "Theatre already exists in city_name"
}
```

---

### POST `/api/account/theatres/get`

Returns all theatres owned by a specific vendor.

**Request Body:**

```json
{
  "vendor": "vendor_id"
}
```

**Response:**

```json
{
  "theatres": [
    {
      "name": "Theatre Name",
      "city": "City",
      "screens": []
    },
    .
    }.
  ]
}
```

---