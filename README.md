

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

## Screenshots



![mongo1](https://github.com/simarmehta/MonterAssessment/assets/70880900/d0e67807-4943-441a-a018-3f1cde643b41)



![Post API](https://github.com/simarmehta/MonterAssessment/assets/70880900/b2a45b1e-518d-4ca8-a965-25831a46ce38)



![Verify](https://github.com/simarmehta/MonterAssessment/assets/70880900/95de85f9-7a3e-4b40-99ac-d640521cd591)



![login fail](https://github.com/simarmehta/MonterAssessment/assets/70880900/e15352f5-d7ba-4421-9e3d-2cdb602158f0)



![login passed](https://github.com/simarmehta/MonterAssessment/assets/70880900/40fcba70-7ca6-4655-be70-6ec17e6a8684)


![userinfo](https://github.com/simarmehta/MonterAssessment/assets/70880900/78fd5b8e-7998-4cca-8fa7-e3067299d41f)


```

This README provides a full guide from setup to execution, including installation instructions, API endpoints descriptions, and additional notes on security and testing. You can customize the URL and any other specific details as necessary.



