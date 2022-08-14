import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ').pop();
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

export const login = (req, res) => {
    // Authenticate User
    const username = req.body.login;
    const password = req.body.password;

    const user = {
        name: username,
        password: password
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({
        accessToken: accessToken
    })
}