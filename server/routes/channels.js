const express = require("express");
const router = express.Router();
const channelsController = require("../controllers/channelsController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").post(verifyJWT, channelsController.createChannel);

router
    .route("/:channel_name/join")
    .get(verifyJWT, channelsController.addChannelMember)
    .delete(verifyJWT, channelsController.removeChannelMember);

router
    .route("/:channel_name")
    .get(verifyJWT, channelsController.getChannelRole);

module.exports = router;
