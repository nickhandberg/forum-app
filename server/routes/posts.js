const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/:channel_name").get(postsController.getPostsByChannel);

router
    .route("/")
    .get(postsController.getAllPosts)
    .post(verifyJWT, postsController.createPost);

router
    .route("/:id")
    .get(postsController.getPost)
    .put(verifyJWT, postsController.updatePost)
    .delete(verifyJWT, postsController.deletePost);

module.exports = router;
