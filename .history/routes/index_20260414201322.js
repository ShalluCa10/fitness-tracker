const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/", async (req, res) => {
    const response = await axios.get(
        "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20"
    );

    const exercises = response.data.results;

    res.render("home", { exercises });
});
module.exports = router;