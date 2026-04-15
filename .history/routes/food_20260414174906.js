const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("workout page working 🍎");
});

module.exports = router;