const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .route("/getComment/:comment_id")
    .get(commentsController.getCommentById)
    .put(verifyJWT, commentsController.editComment)
    .delete(verifyJWT, commentsController.deleteComment);

router
    .route("/:post_id")
    .get(commentsController.getComments)
    .post(verifyJWT, commentsController.createComment);

module.exports = router;
