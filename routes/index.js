const router = require("express").Router();
router.use("/user", require("./api/users"));
router.use("/profile", require("./api/profile.js"));
router.use("/posts", require("./api/posts.js"));

module.exports = router;
