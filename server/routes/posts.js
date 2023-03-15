const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .route("/")
    .get(postsController.getAllPosts)
    .post(verifyJWT, postsController.createPost);

router
    .route("/getPost/:id")
    .get(postsController.getPost)
    .put(verifyJWT, postsController.updatePost)
    .delete(verifyJWT, postsController.deletePost);

router.get("/getByUser/:username", postsController.getPostsByUser);

router.get("/:channel_name", postsController.getPostsByChannel);

module.exports = router;
