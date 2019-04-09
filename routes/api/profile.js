const router = require("express").Router();

router.get("/", (req, res) => res.send("api/profile"));
module.exports = router;
