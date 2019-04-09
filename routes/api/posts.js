const router = require("express").Router();

router.get("/", (req, res) => res.send("api/posts"));
module.exports = router;
