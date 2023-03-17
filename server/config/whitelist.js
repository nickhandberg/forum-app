// Cross Origin Resource Sharing with whitelist
const whitelist = [
    "https://sawwit.netlify.app",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:5000",
    process.env.CLIENT_URL,
];

module.exports = whitelist;
