import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export const AuthLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Lean object keeps session data BSON-agnostic to avoid version conflicts
        const loggedUser = await User.findOne({ email }).lean();
        console.log(loggedUser);
        if (!loggedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (loggedUser.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { password: _pw, ...safeUser } = loggedUser || {};
        const userId = loggedUser?._id?.toString?.() || loggedUser?._id;

        // Generate JWT Token
        const token = jwt.sign(
            { 
                userId, 
                email: loggedUser.email,
                role: loggedUser.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        // Store user in session (optional - for backward compatibility)
        req.session.user = {
            ...safeUser,
            _id: userId
        };

        // Set JWT token as httpOnly cookie (secure, cannot be accessed by JavaScript)
        res.cookie('authToken', token, {
            httpOnly: true,           // Cannot be accessed by JavaScript (prevents XSS attacks)
            secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
            sameSite: 'strict',       // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
        });

        res.status(200).json({ 
            message: 'Login successful', 
            user: safeUser,
            token: token,
            expiresIn: JWT_EXPIRY
        });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const AuthLogout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

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