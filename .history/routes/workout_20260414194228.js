const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=10"
        );

        const exercises = response.data.results; 

        res.render("workout", { exercises }); 
    } catch (error) {
        console.error(error.message);
        res.send("Error fetching workouts");
    }
});

module.exports = router;