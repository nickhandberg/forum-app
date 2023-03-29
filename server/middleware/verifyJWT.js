const jwt = require("jsonwebtoken");
const pool = require("../db");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }

    const token = authHeader?.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403); //invalid token
        }
        req.username = decoded?.UserInfo.username;
        const { rows: user } = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [req.username]
        );
        req.user = user[0];
        next();
    });
};

module.exports = verifyJWT;

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) return res.sendStatus(403); //invalid token
//         req.username = decoded.UserInfo.username;
//         next();
//     });
// };

// module.exports = verifyJWT;
