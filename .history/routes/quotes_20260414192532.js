const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    const response = await axios.get("https://zenquotes.io/api/random");

    res.render("quotes", {
        quote: response.data[0]
    });
});

module.exports = router;