const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .route("/")
    .get(postsController.getAllPosts)
    .post(verifyJWT, postsController.createPost);

router
    .get("/private/", verifyJWT, postsController.getAllPosts)
    .get("/private/getPost/:id", verifyJWT, postsController.getPost);

router
    .route("/getPost/:id")
    .post(verifyJWT, postsController.handleVote)
    .get(postsController.getPost)
    .put(verifyJWT, postsController.updatePost)
    .delete(verifyJWT, postsController.deletePost);

module.exports = router;
