

# Express Authentication API

This project is an Express.js application integrated with MongoDB to manage user authentication, including features such as registration, login, email verification with OTP, and protected routes access using JWT tokens.

## Features

- **User Registration**: Allows users to register using their email and password.
- **Email Verification with OTP**: Sends an OTP to the registered email for verification.
- **Secure Login**: Authenticates users and provides a JWT for accessing protected routes.
- **Retrieve User Info**: Allows fetching user data through a JWT-secured route.

## Prerequisites

- Node.js
- MongoDB
- Nodemailer account setup for sending emails

## Installation

1. **Clone the repository**
   ```bash
   git clone https://your-repository-url.git
   cd your-project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   ```

   Replace `your_jwt_secret`, `yourdbname`, `your_email@example.com`, and `your_email_password` with your actual data.

4. **Start MongoDB**
   Ensure MongoDB is running on your system.

## Running the Server

Execute the following command to start the server:
```bash
npm start
```
The server will start running on `http://localhost:3000`.

## API Endpoints

- **POST /register**
  - Registers a new user with email and password.
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- **POST /verify-otp**
  - Verifies user's email with the OTP sent.
  - Body: `{ "email": "user@example.com", "otp": "123456" }`

- **POST /login**
  - Authenticates the user and returns a JWT.
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- **GET /user**
  - Retrieves the authenticated user's information.
  - Header: `Authorization: Bearer <jwt_token>`

## Security Features

- Passwords are hashed using bcrypt.
- JWTs are used for maintaining user sessions.
- Email verification through OTP ensures user authenticity.

## Testing the API

Use Postman or any similar API testing tool to interact with the API by sending requests to `http://localhost:3000` along with the required headers and body payloads as described above.


```

This README provides a full guide from setup to execution, including installation instructions, API endpoints descriptions, and additional notes on security and testing. You can customize the URL and any other specific details as necessary.