# NoteTakingApp

<<<<<<< HEAD
A modern, full-stack note-taking application with secure authentication (Email/OTP & Google Auth0) and user-specific notes management.

---

## Features

- **User Registration** (with Email & OTP verification)
- **Login** (Email/OTP or Google Auth0)
- **Session Management** (secure, with cookies)
- **Create, List, and Delete Notes** (user-specific)
- **Responsive Dashboard** (mobile-first, clean UI)
- **Google Auth0 Integration**
- **Error Handling & Feedback** (for all actions)
- **User Info Display** (name & email on dashboard)

---

## Tech Stack

- **Frontend:** React, Vite, Axios, Auth0, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, express-session
- **Authentication:** Email/OTP, Google Auth0

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NoteTakingApp.git
cd NoteTakingApp
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

- Create a `.env` file in `Backend/` with:
  ```
  MONGO_URL=your_mongodb_connection_string
  USER_ID=your_gmail_address
  PASS=your_gmail_app_password
  RUNNING_PORT=8080
  ```

- Start the backend server:
  ```bash
  node index.js
  ```

### 3. Setup the Frontend

```bash
cd ../Frontend
npm install
```

- Create a `.env` file in `Frontend/` with your Auth0 credentials:
  ```
  VITE_DOMAIN=your_auth0_domain
  VITE_CLIENT_ID=your_auth0_client_id
  ```

- Start the frontend:
  ```bash
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Usage

### Registration & Login

- **Register:** Enter your name, DOB, and email. You'll receive an OTP via email.
- **Verify OTP:** Enter the OTP to verify your account.
- **Login:** Enter your email, click "Send OTP", then enter the OTP to log in.
- **Google Login:** Click "Continue with Google" to log in with your Google account.

### Dashboard

- **Welcome Card:** Shows your name and email.
- **Create Note:** Click "Create Note", enter a title and content, and save.
- **List Notes:** All your notes are listed below.
- **Delete Note:** Click the trash icon to delete a note.

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/verify-otp` — Verify OTP
- `POST /api/auth/resend-otp` — Resend OTP
- `POST /api/auth/login` — Login with email/OTP
- `POST /api/auth/logout` — Logout
- `POST /api/auth/dashboard2` — Get dashboard info (protected)

### Notes

- `POST /api/notes/create` — Create a note (requires login)
- `GET /api/notes/all` — List all notes for the user (requires login)
- `DELETE /api/notes/delete/:noteId` — Delete a note (requires login)

---

## Folder Structure

```
NoteTakingApp/
  Backend/
    controllers/
    dbConnection/
    middleware/
    models/
    routes/
    index.js
    ...
  Frontend/
    src/
      Components/
      assets/
      App.jsx
      main.jsx
      ...
    public/
      image.png
      logo.png
    ...
```

---

## Customization

- **Logo:** Replace `Frontend/public/logo.png` with your own logo.
- **Delete Icon:** Replace `Frontend/public/image.png` for the delete button.

---

## License

MIT

---

**Enjoy your secure, modern note-taking app!**
=======
- https://github.com/lakshrajkumar26/noteApp
- # NoteTakingApp

A modern, full-stack note-taking application with secure authentication (Email/OTP & Google Auth0) and user-specific notes management.

---

## Features

- **User Registration** (with Email & OTP verification)
- **Login** (Email/OTP or Google Auth0)
- **Session Management** (secure, with cookies)
- **Create, List, and Delete Notes** (user-specific)
- **Responsive Dashboard** (mobile-first, clean UI)
- **Google Auth0 Integration**
- **Error Handling & Feedback** (for all actions)
- **User Info Display** (name & email on dashboard)

---

## Tech Stack

- **Frontend:** React, Vite, Axios, Auth0, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, express-session
- **Authentication:** Email/OTP, Google Auth0

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NoteTakingApp.git
cd NoteTakingApp
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

- Create a `.env` file in `Backend/` with:
  ```
  MONGO_URL=your_mongodb_connection_string
  USER_ID=your_gmail_address
  PASS=your_gmail_app_password
  RUNNING_PORT=8080
  ```

- Start the backend server:
  ```bash
  node index.js
  ```

### 3. Setup the Frontend

```bash
cd ../Frontend
npm install
```

- Create a `.env` file in `Frontend/` with your Auth0 credentials:
  ```
  VITE_DOMAIN=your_auth0_domain
  VITE_CLIENT_ID=your_auth0_client_id
  ```

- Start the frontend:
  ```bash
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Usage

### Registration & Login

- **Register:** Enter your name, DOB, and email. You'll receive an OTP via email.
- **Verify OTP:** Enter the OTP to verify your account.
- **Login:** Enter your email, click "Send OTP", then enter the OTP to log in.
- **Google Login:** Click "Continue with Google" to log in with your Google account.

### Dashboard

- **Welcome Card:** Shows your name and email.
- **Create Note:** Click "Create Note", enter a title and content, and save.
- **List Notes:** All your notes are listed below.
- **Delete Note:** Click the trash icon to delete a note.

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/verify-otp` — Verify OTP
- `POST /api/auth/resend-otp` — Resend OTP
- `POST /api/auth/login` — Login with email/OTP
- `POST /api/auth/logout` — Logout
- `POST /api/auth/dashboard2` — Get dashboard info (protected)

### Notes

- `POST /api/notes/create` — Create a note (requires login)
- `GET /api/notes/all` — List all notes for the user (requires login)
- `DELETE /api/notes/delete/:noteId` — Delete a note (requires login)

---

## Folder Structure

```
NoteTakingApp/
  Backend/
    controllers/
    dbConnection/
    middleware/
    models/
    routes/
    index.js
    ...
  Frontend/
    src/
      Components/
      assets/
      App.jsx
      main.jsx
      ...
    public/
      image.png
      logo.png
    ...
```

---

## Customization

- **Logo:** Replace `Frontend/public/logo.png` with your own logo.
- **Delete Icon:** Replace `Frontend/public/image.png` for the delete button.

---

## License

MIT

---

**Enjoy your secure, modern note-taking app!**

- payload
{
    "email" : "test12434@gmail.com",
    "name" : "test12343",
    "dob" : "2025-11-23",
    "otp" :  "",
    "isVerified" : false,
    "googleId" : "www.google.com"
}
>>>>>>> 3927686f90476a46faebb4b05a64cf1698c27bb6
