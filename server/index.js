require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json()); // req.body

// ROUTES
app.use("/posts", require("./routes/posts"));

// delete a post

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
