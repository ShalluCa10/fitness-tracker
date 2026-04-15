const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://type.fit/api/quotes");

        const quotes = response.data.slice(0, 5);

        const banners = quotes.map((q, index) => ({
            id: index,
            text: q.text,
            author: q.author || "Unknown",
            image: "https://source.unsplash.com/1600x600/?fitness,gym,workout"
        }));

        res.render("home", { banners });

    } catch (error) {
        console.log(error);
        res.render("home", { banners: [] });
    }
});

module.exports = router;