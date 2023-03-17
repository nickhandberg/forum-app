const whitelist = require("./whitelist");

const corsOptions = {
    origin: process.env.CLIENT_URL,

    methods: ["GET, POST, PUT, DELETE, OPTIONS"],

    allowedHeaders: [
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
};

module.exports = corsOptions;
