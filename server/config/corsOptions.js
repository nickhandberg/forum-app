const whitelist = require("./whitelist");

const corsOptions = {
    // origin: (origin, callback) => {
    //     // NOTE: REMOVE !origin on production
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // },
    origin: "https://sawwit.netlify.app",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["*"],
    optionsSuccessStatus: 200,
    credentials: true,
};

module.exports = corsOptions;
