import webRoutes from './routes/web/index.js';
import apiRoutes from './routes/api/index.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import express from "express";
import path from 'path';
import session from 'express-session';
import connectMongoDBSession  from 'connect-mongodb-session';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { verifyEmailConfig } from './services/emailService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
connectDB();

const MongoDBStore = new connectMongoDBSession((session))({
  uri: process.env.DB_URL + '/' + process.env.DB_NAME,
  collection: 'sessions'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

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

const PORT = 5000;


// ==================== API Routes ====================
app.use('/api', apiRoutes);
// ==================== WEB Routes ====================
app.use('/', webRoutes);

process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    // Verify email configuration (non-blocking)
    verifyEmailConfig().then(isValid => {
        if (isValid) {
            console.log('📧 Email service configured and ready');
        } else {
            console.warn('⚠️  Email service not configured. Check .env for EMAIL_USER and EMAIL_APP_PASSWORD');
        }
    }).catch(err => {
        console.warn('⚠️  Email verification skipped:', err.message);
    });
});

