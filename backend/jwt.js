// middleware/jwt.js
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, password: user.password, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// JWT Auth Middleware
const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token not found' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info

        // Admin bypass flag
        if (decoded.role === 'admin') {
            req.user.isAdmin = true;
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { generateToken, jwtAuthMiddleware };
