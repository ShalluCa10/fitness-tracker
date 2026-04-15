const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("workout", { data: null });
});

router.post("/", async (req, res) => {
    const query = req.body.search;

    console.log("SEARCH:", query); // DEBUG

    if (!query) {
        return res.render("workout", {
            data: [],
            error: "No search term"
        });
    }

    try {
        const response = await axios.get(
            `https://world.openworkoutfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
        );

        const products = response.data.products.map(item => ({
            name: item.product_name || "Unknown",
            calories: item.nutriments?.["energy-kcal_100g"] || 0
        }));

        console.log("RESULTS:", products.length); // DEBUG

        res.render("workout", { data: products });

    } catch (err) {
        console.log(err);
        res.render("workout", { data: [], error: "API error" });
    }
});

// ADD workout TO DASHBOARD
router.post("/add", (req, res) => {
    const { name, calories } = req.body;

    dashboard.workouts.push({
        name,
        calories: Number(calories)
    });

    res.redirect("/workout");
});

module.exports = router;