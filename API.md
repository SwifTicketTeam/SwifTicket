# SwifTicket API – Official Documentation

All endpoints are prefixed with:

```
http://localhost:3000
```

---

## Authentication & Session Routes

### 1. Register a New User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

---

### 2. Login

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

---

### 3. Email Verification

**GET** `/api/auth/verified`
**Headers:**

```
Authorization: Bearer <token>
```

**Behavior:**

* Redirects to login page if token is valid and verified
* Redirects to verification error page if token is invalid or expired

---

### 4. Forgot Password

**POST** `/api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### 5. Reset Password

**POST** `/api/auth/reset-password`

**Request Body:**

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### 6. Session Verification

**POST** `/api/auth/jwt`

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

## User Profile & Account

### 7. Upload Profile Photo

**POST** `/api/uploads/images/users/:userid`
**FormData:**

* `userProfilePhoto`: image file (`.jpg`, `.jpeg`, `.png`)
* `token`: JWT token

**Response:**

```json
{
  "message": "Profile Photo Uploaded Successfully"
}
```

---

### 8. Get Profile Photo

**GET** `/api/uploads/images/users/:userid`
**Response:**
Returns the profile photo as an image blob (`image/*` MIME type)

---

### 9. Change User Details

**PUT** `/api/account/users/:userid`
**Request Body (any or all fields optional):**

```json
{
  "username": "new_username",
  "email": "new_email",
  "bio": "updated bio"
}
```

**Behavior:**

* Only fields that differ from existing values are updated
* If `email` is changed, a verification email is sent instead of immediate change

**Response:**

```json
{
  "message": "User details updated successfully"
}
```

---

## Events & Movie Search

### 10. Get Movie List

**GET** `/api/events/movies`

**Query Parameters:**

* `search`: optional string to match title (partial, case-insensitive)
* `genre`: optional comma-separated genre string

**Example:**

```
/api/events/movies?search=spider&genre=Action,Adventure
```

**Response:**

```json
[
  {
    "_id": "movieid123",
    "title": "Spider-Man: No Way Home",
    "genres": ["Action", "Adventure"],
    "poster": "server/storage/images/movieid123.jpg"
  },
  ...
]
```

**Behavior:**

* Filters movies by title match and/or genre
* Uses MongoDB for optimized query performance
* Poster image path refers to static storage

---

## Miscellaneous

### 11. API Landing Page

**GET** `/api`

**Behavior:**
Returns the API documentation as Markdown or HTML

---

### 12. Server Root

**GET** `/`

**Behavior:**
Returns server status or welcome message

---