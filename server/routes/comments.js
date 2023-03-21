const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .route("/:post_id")
    .get(commentsController.getComments)
    .post(commentsController.createComment);

module.exports = router;
