# JWT (JSON Web Token) Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [What is JWT?](#what-is-jwt)
3. [JWT Structure](#jwt-structure)
4. [Installation](#installation)
5. [Step-by-Step Implementation](#step-by-step-implementation)
6. [Configuration](#configuration)
7. [Usage Examples](#usage-examples)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

---

## Overview

This guide provides a complete walkthrough of JWT implementation in the NextGen HR application. JWT tokens enable stateless authentication for API requests while maintaining backward compatibility with session-based authentication for web routes.

### Key Benefits
- **Stateless Authentication**: No need to store session data on the server
- **API-Friendly**: Perfect for mobile apps and third-party integrations
- **Scalable**: Works seamlessly with microservices and load balancers
- **Secure**: Token-based with expiration and signature verification
- **Backward Compatible**: Existing session authentication still works

---

## What is JWT?

JWT is a standard for creating access tokens that assert claims about the subject (typically the user). It consists of three parts separated by dots (`.`):

```
header.payload.signature
```

### Example JWT Token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzVlNmE3ZjQxZDI3ZTAwMWFiYzc4OTAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzMxMjM0NTcsImV4cCI6MTY3MzcyODI1N30.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

---

## JWT Structure

### 1. Header
Contains the token type and the hashing algorithm used.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. Payload
Contains the claims (user data).

```json
{
  "userId": "635e6a7f41d27e001abc7890",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1673123457,
  "exp": 1673728257
}
```

### 3. Signature
Ensures the token hasn't been tampered with.

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

---

## Installation

### Step 1: Install Required Package

```bash
npm install jsonwebtoken
```

This adds the `jsonwebtoken` library to your project, which handles JWT creation and verification.

### Verify Installation

Check that `jsonwebtoken` appears in `package.json`:

```json
{
  "dependencies": {
    "jsonwebtoken": "^9.0.0"
  }
}
```

---

## Step-by-Step Implementation

### Step 1: Update Environment Variables

Add JWT configuration to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-in-production-to-something-long-and-random
JWT_EXPIRY=7d
SESSION_SECRET=your-session-secret-key
```

**Important Notes:**
- `JWT_SECRET` should be a long, random string (recommended 32+ characters)
- `JWT_EXPIRY` can be: `"7d"`, `"24h"`, `"30m"`, or any valid time format
- Never commit `.env` file with real secrets to version control

### Step 2: Update Auth Controller

The Auth controller is responsible for generating and managing tokens.

**File: `controller/Auth.js`**

```javascript
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export const AuthLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user in database
        const loggedUser = await User.findOne({ email }).lean();
        
        if (!loggedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password (note: consider using bcrypt in production)
        if (loggedUser.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Exclude sensitive data
        const { password: _pw, ...safeUser } = loggedUser || {};
        const userId = loggedUser?._id?.toString?.() || loggedUser?._id;

        // ===== GENERATE JWT TOKEN =====
        const token = jwt.sign(
            { 
                userId,                           // User ID
                email: loggedUser.email,           // User email
                role: loggedUser.role              // User role for authorization
            },
            JWT_SECRET,                            // Secret key
            { expiresIn: JWT_EXPIRY }              // Token expiration
        );

        // Store user in session for web requests (backward compatibility)
        req.session.user = {
            ...safeUser,
            _id: userId
        };

        // Return token to client
        res.status(200).json({ 
            message: 'Login successful', 
            user: safeUser,
            token: token,                          // JWT Token
            expiresIn: JWT_EXPIRY
        });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const AuthLogout = async (req, res) => {
    try {
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (err) {
        console.error('Logout failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
```

### Step 3: Create JWT Verification Middleware

Create a dedicated middleware for JWT verification.

**File: `middleware/verifyJWT.js`**

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Middleware to verify JWT tokens
 * Extracts token from Authorization header (Bearer token)
 * Validates token signature and expiration
 * Attaches decoded user data to req.user
 */
export const verifyJWT = (req, res, next) => {
    try {
        // Extract token from Authorization header
        // Expected format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        // Verify token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                
                // Handle specific JWT errors
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ 
                        message: 'Token expired',
                        expiredAt: err.expiredAt
                    });
                }
                
                if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            
            // Attach decoded user data to request object
            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error('JWT verification error:', err);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

export default verifyJWT;
```

### Step 4: Update Auth Middleware

Update the existing auth middleware to support both JWT and session authentication.

**File: `middleware/auth.js`**

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Authentication middleware that supports both JWT and session-based auth
 * - For API requests: Checks for Bearer token in Authorization header
 * - For web requests: Falls back to session authentication
 * - Handles both JSON and HTML responses based on request type
 */
const isAuth = (req, res, next) => {
    // ===== CHECK JWT TOKEN FIRST (for API requests) =====
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    }

    // ===== CHECK SESSION (for web requests) =====
    if (req.session && req.session.user) {
        return next();
    }

    // ===== NO AUTHENTICATION FOUND =====
    // Return JSON for API requests, redirect for web requests
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    res.redirect('/login');
};

export default isAuth;
```

### Step 5: Update API Routes

Add the logout endpoint to your API routes.

**File: `routes/api/auth.routes.js`**

```javascript
import Router from 'express';
import { AuthLogin, AuthLogout } from '../../controller/Auth.js';
import isAuth from '../../middleware/auth.js';

const router = Router();

// Public route - Login
router.post('/login', AuthLogin);

// Protected route - Logout (requires authentication)
router.post('/logout', isAuth, AuthLogout);

export default router;
```

### Step 6: Update Server Configuration

Update server.js to include JWT configuration notes.

**File: `server.js`**

```javascript
// ... existing code ...

// Session configuration for web requests
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
    maxAge: 1000 * 60 * 60  // 1 hour
   },
  store : MongoDBStore
}));

// JWT Configuration
// JWT tokens are validated in the isAuth middleware
// For API requests: Use Bearer token in Authorization header
// For web requests: Use session cookies
// Example API request header: Authorization: Bearer <token>

// ... rest of routes ...
```

---

## Configuration

### Environment Variables

Create or update your `.env` file:

```env
# Database
DB_URL=mongodb://localhost:27017
DB_NAME=nextgen_hr

# Session
SESSION_SECRET=your-session-secret-key-here

# JWT Configuration
JWT_SECRET=your-very-long-random-secret-key-minimum-32-characters-recommended
JWT_EXPIRY=7d
```

### JWT_EXPIRY Options

- `"24h"` - 24 hours
- `"7d"` - 7 days (recommended for most applications)
- `"30d"` - 30 days
- `"60s"` - 60 seconds (for testing)
- `3600` - 3600 seconds

---

## Usage Examples

### Example 1: Login and Get Token

**Request:**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "635e6a7f41d27e001abc7890",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "employee"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzVlNmE3ZjQxZDI3ZTAwMWFiYzc4OTAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2NzMxMjM0NTcsImV4cCI6MTY3MzcyODI1N30.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "expiresIn": "7d"
}
```

### Example 2: Access Protected Route with Token

**Request:**
```bash
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (if token is valid):**
```json
{
  "message": "Request successful",
  "data": [ ... ]
}
```

**Response (if token is expired or invalid):**
```json
{
  "message": "Invalid or expired token"
}
```

### Example 3: Logout

**Request:**
```bash
POST /api/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Example 4: JavaScript Client Implementation

```javascript
// Save token after login
async function login(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    }
    
    throw new Error(data.message);
}

// Make authenticated request
async function getProtectedData() {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (response.status === 403) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
    }
    
    return await response.json();
}

// Logout
async function logout() {
    const token = localStorage.getItem('authToken');
    
    await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
}
```

### Example 5: Using JWT in Protected Routes

To protect any API route with JWT, simply add the `isAuth` middleware:

```javascript
import isAuth from '../../middleware/auth.js';

// Protected route
router.get('/user-profile', isAuth, async (req, res) => {
    try {
        // req.user contains decoded JWT data
        const userId = req.user.userId;
        const userEmail = req.user.email;
        
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
```

---

## Security Best Practices

### 1. **JWT Secret Management**
```javascript
// ❌ WRONG - Hardcoded secret
const JWT_SECRET = 'my-secret';

// ✅ CORRECT - Use environment variables
const JWT_SECRET = process.env.JWT_SECRET;
```

### 2. **Secure Token Storage (Client-side)**
```javascript
// ❌ WRONG - Store in localStorage (vulnerable to XSS)
localStorage.setItem('token', token);

// ✅ BETTER - Store in httpOnly cookie (JavaScript cannot access)
// Set this on the server when setting the cookie
```

### 3. **HTTPS in Production**
```javascript
// ❌ WRONG - Insecure cookie in production
cookie: { secure: false }

// ✅ CORRECT - Secure cookie in production
cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
}
```

### 4. **Token Expiration**
```javascript
// ❌ WRONG - Token never expires
{ expiresIn: null }

// ✅ CORRECT - Set reasonable expiration
{ expiresIn: '7d' }
```

### 5. **Password Security**
```javascript
// ❌ WRONG - Store plain text passwords
password: 'mypassword123'

// ✅ CORRECT - Use bcrypt for hashing
import bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 6. **CORS Configuration**
```javascript
import cors from 'cors';

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### 7. **Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts, please try again later'
});

router.post('/login', loginLimiter, AuthLogin);
```

---

## Troubleshooting

### Issue 1: "Access token required"

**Cause:** No token provided in the Authorization header.

**Solution:**
```javascript
// Make sure to include the Authorization header
fetch('/api/protected-route', {
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
});
```

### Issue 2: "Invalid or expired token"

**Cause:** Token is invalid or has expired.

**Solution:**
```javascript
// Get a new token by logging in again
const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
});

const { token } = await response.json();
```

### Issue 3: "Secret key should be a string"

**Cause:** JWT_SECRET environment variable is not set.

**Solution:**
```bash
# Add to .env file
JWT_SECRET=your-secret-key-here
```

### Issue 4: Token works but user data is undefined

**Cause:** `req.user` is not properly attached by the middleware.

**Solution:**
```javascript
// Make sure isAuth middleware runs before the route handler
router.get('/profile', isAuth, (req, res) => {
    console.log(req.user); // Should contain decoded JWT data
});
```

### Issue 5: CORS errors with tokens

**Cause:** CORS not configured to allow Authorization header.

**Solution:**
```javascript
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## API Reference

### JWT Module Functions

#### `jwt.sign(payload, secret, options)`

Creates a new JWT token.

```javascript
const token = jwt.sign(
    { userId: '123', role: 'admin' },      // Payload
    'secret-key',                          // Secret
    { expiresIn: '7d' }                    // Options
);
```

**Parameters:**
- `payload` (object): Data to encode in the token
- `secret` (string): Secret key for signing
- `options` (object): Configuration options
  - `expiresIn`: Token expiration time
  - `issuer`: Token issuer
  - `audience`: Token audience
  - `subject`: Token subject

#### `jwt.verify(token, secret, options, callback)`

Verifies and decodes a JWT token.

```javascript
jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
        console.log('Token invalid');
    } else {
        console.log(decoded); // { userId: '123', role: 'admin', ... }
    }
});
```

#### `jwt.decode(token)`

Decodes a token without verification (unsafe).

```javascript
const decoded = jwt.decode(token);
console.log(decoded); // Token payload without verification
```

---

## Complete Example: User Service with JWT

```javascript
// controllers/UserController.js
import User from '../models/User.js';
import isAuth from '../middleware/auth.js';

export const getUserProfile = async (req, res) => {
    try {
        // req.user is set by isAuth middleware
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, phone },
            { new: true }
        );
        
        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// routes/api/user.routes.js
import Router from 'express';
import { getUserProfile, updateUserProfile } from '../../controller/User.js';
import isAuth from '../../middleware/auth.js';

const router = Router();

router.get('/profile', isAuth, getUserProfile);
router.put('/profile', isAuth, updateUserProfile);

export default router;
```

---

## Summary

JWT implementation in your NextGen HR application provides:

✅ **Stateless authentication** for API requests
✅ **Backward compatibility** with session-based web authentication
✅ **Secure token-based access** with signature verification
✅ **Token expiration** for enhanced security
✅ **Role-based authorization** data in tokens
✅ **Easy integration** with frontend applications

Follow the security best practices and customize the implementation based on your specific requirements.

For production deployment, ensure:
- `JWT_SECRET` is a long, random string
- HTTPS is enabled
- Tokens are stored securely on the client
- Rate limiting is implemented
- Password hashing is used (bcrypt)
- CORS is properly configured

---

**Last Updated:** January 6, 2026
**Version:** 1.0
