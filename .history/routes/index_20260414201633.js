const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        // QUOTES API
        const quoteResponse = await axios.get("https://type.fit/api/quotes");

        const quotes = quoteResponse.data.slice(0, 5);

        const banners = quotes.map((q, index) => ({
            id: index,
            text: q.text,
            author: q.author || "Unknown",
            image: `https://source.unsplash.com/1600x600/?fitness,gym,workout&sig=${index}`
        }));
        // EXERCISE API
        const exerciseResponse = await axios.get(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20"
        );

        const exercises = exerciseResponse.data.results || [];

        res.render("home", {
            banners,
            exercises
        });

    } catch (error) {
        console.log(error);

        res.render("home", {
            banners: [],
            exercises: []
        });
    }
});

module.exports = router;