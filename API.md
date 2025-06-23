# 📘 SwifTicket API – Official Documentation

All endpoints are prefixed with `http://localhost:3000`

---

## 🔐 Authentication & Session Routes

### 1. Register a New User

**POST** `/api/auth/register`

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

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

---

### 3. Email Verification

**GET** `/api/auth/verified`
**Headers:** `Authorization: Bearer <token>`
**Behavior:**

* Redirects to login page if verified
* Redirects to verification error page if token is invalid or expired

---

### 4. Forgot Password

**POST** `/api/auth/forgot-password`

```json
{
  "email": "john@example.com"
}
```

---

### 5. Reset Password

**POST** `/api/auth/reset-password`

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

---

### 6. Session Verification

**POST** `/api/auth/jwt`

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

## 👤 User Profile & Account

### 7. Upload Profile Photo

**POST** `/api/uploads/images/users/:userid`
**FormData:**

* `userProfilePhoto`: image file (`.jpg`, `.png`, etc.)
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

* Returns an image blob (MIME type: `image/*`)
* Can be directly rendered as profile picture in frontend

---

### 9. Change User Details

**PUT** `/api/account/users/:userid`
**Request Body:**

```json
{
  "username": "new_username",    // optional
  "email": "new_email",          // optional
  "bio": "new_bio"               // optional
}
```

**Behavior:**

* Updates only fields that differ from current values
* If `email` is updated, a verification mail is sent — change is **not** immediate

**Success Response:**

```json
{
  "message": "User details updated successfully"
}
```

---

## 🌐 Miscellaneous

### 10. API Landing Page

**POST** `/api`
**Behavior:** Returns this API documentation as HTML or Markdown

---

### 11. Server Root

**GET** `/`
**Behavior:** Displays server status or homepage

---