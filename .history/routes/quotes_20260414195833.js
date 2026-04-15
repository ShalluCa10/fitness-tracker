const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get quotes page (full list)
router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://type.fit/api/quotes");

        const quotes = response.data.slice(0, 20);

        res.render("quotes", { quotes });

    } catch (error) {
        console.log(error);
        res.render("quotes", { quotes: [] });
    }
});

module.exports = router;