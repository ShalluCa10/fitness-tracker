const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    const response = await axios.get("https://wger.de/api/v2/exerciseinfo/");
    
    res.render("workout", {
        exercises: response.data.results.slice(0, 10)
    });
});

module.exports = router;