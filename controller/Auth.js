import User from '../models/User.js';

export const AuthLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loggedUser = await User.findOne({ email });
        console.log(loggedUser);
        if (!loggedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (loggedUser.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Return JSON so the frontend fetch can redirect after parsing the response
        const { password: _pw, ...safeUser } = loggedUser;
        res.cookie('LoggedIn', true);
        res.status(200).json({ message: 'Login successful', user: safeUser });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}