const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET ALL CATEGORIES (HOME)
router.get("/", async (req, res) => {
    const response = await axios.get(
        "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"
    );

    const exercises = response.data.results;

    // group by category
    const categoriesMap = {};

    exercises.forEach(ex => {
        const cat = ex.category?.name || "Other";

        if (!categoriesMap[cat]) {
            categoriesMap[cat] = {
                name: cat,
                image: ex.images?.[0]?.image || null,
                count: 0
            };
        }

        categoriesMap[cat].count++;
    });

    const categories = Object.values(categoriesMap);

    res.render("home", { categories });
});

// GET EXERCISES BY CATEGORY
router.get("/:category", async (req, res) => {
    const category = req.params.category;

    const response = await axios.get(
        "https://wger.de/api/v2/exerciseinfo/?language=2&limit=100"
    );

    const exercises = response.data.results.filter(
        ex => ex.category?.name === category
    );

    res.render("workout", { exercises, category });
});

module.exports = router;