const whitelist = require("./whitelist");

const corsOptions = {
    // origin: (origin, callback) => {
    //     // NOTE: REMOVE !origin on production
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         console.log(origin);
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // },
    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
    credentials: true,
};

module.exports = corsOptions;
