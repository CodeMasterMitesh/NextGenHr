import User from '../models/User.js';

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
        req.session.user = {
            ...safeUser,
            _id: loggedUser?._id?.toString?.() || loggedUser?._id
        };

        res.status(200).json({ message: 'Login successful', user: safeUser });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}