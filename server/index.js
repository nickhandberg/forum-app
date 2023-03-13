require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); // req.body
app.use(cookieParser());

// ROUTES
app.use("/posts", require("./routes/posts"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
