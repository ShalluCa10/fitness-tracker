const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20"
        );

        const exercises = response.data.results || [];

        res.render("workout", { exercises });

    } catch (error) {
        console.error(error);
        res.render("workout", { exercises: [] });
    }
});

module.exports = router;