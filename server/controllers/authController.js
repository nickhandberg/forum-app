const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username/email and password are required" });
    }

    const foundUsers = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    const foundUser = foundUsers.rows[0];

    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password_hash);
    if (match) {
        // create access token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 5 }
        );
        // create refresh token
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: 60 * 60 * 24 * 7 }
        );
        // saving refresh token for current user
        const result = await pool.query(
            "UPDATE users SET refresh_token = $1 WHERE username = $2",
            [refreshToken, foundUser.username]
        );

        // set refreshToken as httpOnly cookie for security. Cannot be accessed by JS
        // should store accessToken in memory on frontend (NOT localstorage or cookies)
        // sameSite set to None allows server and frontend to be on seperate domains
        // use secure to allow https IN PRODUCTION
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true,
        });
        res.json({ accessToken });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

const handleNewuser = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res
            .status(400)
            .json({ message: "Email, username and password are required" });
    }

    try {
        // check for duplicate email or username in db
        const duplicateEmail = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        const duplicateUsername = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (duplicateUsername.rowCount > 0 || duplicateEmail.rowCount > 0)
            return res.sendStatus(409); // conflict

        // encrypt password
        const password_hash = await bcrypt.hash(password, 10);

        // create and store the new user
        const newUser = await pool.query(
            "INSERT INTO users (email, username, password_hash, join_date) VALUES($1, $2, $3, $4) RETURNING *",
            [email, username, password_hash, new Date()]
        );

        res.status(201).json({ success: `New user ${username} created` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken in memory

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUsers = await pool.query(
        "SELECT * FROM users WHERE refresh_token = $1",
        [refreshToken]
    );
    const foundUser = foundUsers.rows[0];
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            // sameSite: "None",
            // secure: true,
        });
        return res.sendStatus(204); // successful but no content
    }

    // clear refreshToken in db
    const result = await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE username = $2",
        ["", foundUser.username]
    );

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUsers = await pool.query(
        "SELECT * FROM users WHERE refresh_token = $1",
        [refreshToken]
    );
    const foundUser = foundUsers.rows[0];
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 60 * 5 }
            );
            const username = decoded.username;
            res.json({ accessToken, username });
        }
    );
};

module.exports = {
    handleLogin,
    handleNewuser,
    handleLogout,
    handleRefreshToken,
};
