import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const isAuth = (req, res, next) => {
    // Check for JWT token first (for API requests)
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

    // Check for JWT token in cookies (for web requests)
    if (req.cookies && req.cookies.authToken) {
        try {
            const decoded = jwt.verify(req.cookies.authToken, JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            res.clearCookie('authToken');
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    }

    // Check for session (for web requests)
    if (req.session && req.session.user) {
        return next();
    }

    // No authentication found
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    res.redirect('/login');
};

export default isAuth;