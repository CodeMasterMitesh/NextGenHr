import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const verifyJWT = (req, res, next) => {
    try {
        // Get token from Authorization header (Bearer token)
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            
            // Attach user data to request object
            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error('JWT verification error:', err);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

export default verifyJWT;
