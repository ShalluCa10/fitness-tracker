const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=10"
        );

        const exercises = response.data.results.map(ex => ({
            name: ex.name,
            description: ex.description
                ? ex.description.replace(/<[^>]*>?/gm, "")
                : "No description available"
        }));

        res.render("workout", { exercises });

    } catch (error) {
        console.log(error.message);
        res.render("workout", { exercises: [] });
    }
});

module.exports = router;