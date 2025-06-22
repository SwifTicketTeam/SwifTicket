# SwifTicket API Official Documentation

All API endpoints are prefixed with `http://localhost:3000`

---

### 🔐 Authentication & Session Routes

#### 1. Register a New User
- **POST** `/api/auth/register`
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "your_password"
}
````

#### 2. Login

* **POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

#### 3. Email Verification

* **GET** `/api/auth/verified`
* **Headers:** `Authorization: Bearer <token>`
* **Behavior:** Redirects to login page if verified, or verification error page if token is invalid/expired

#### 4. Forgot Password

* **POST** `/api/auth/forgot-password`

```json
{
  "email": "john@example.com"
}
```

#### 5. Reset Password

* **POST** `/api/auth/reset-password`

```json
{
  "password": "new_password",
  "token": "reset_token"
}
```

#### 6. Session Verification

* **POST** `/api/auth/jwt`

```json
{
  "token": "jwt_token_here"
}
```

* **Response:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user"
}
```

---

### 🖼️ Profile Photo Uploads

#### 7. Upload Profile Photo

* **POST** `/api/uploads/images/users/`

* **FormData:**

    * `userProfilePhoto`: image file (e.g. `.jpg`, `.png`)
    * `token`: JWT token

* **Success Response:**

```json
{
  "message": "Profile Photo Uploaded Successfully"
}
```

#### 8. Get Profile Photo

* **GET** `/api/uploads/images/users?token=`
* **Response:**
  Returns the profile image associated with the given JWT token

---

### 🌐 Miscellaneous

#### 9. API Landing Page

* **POST** `/api`
* **Behavior:** Returns this API documentation in HTML or Markdown

#### 10. Server Root

* **GET** `/`
* **Behavior:** Displays server status or homepage

```
