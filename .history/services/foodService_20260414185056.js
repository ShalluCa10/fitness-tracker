const express = require("express");
const axios = require("axios");

const router = express.Router();

// temporary memory storage
let calorieList = [];

router.get("/", (req, res) => {
    const totalCalories = calorieList.reduce(
        (sum, item) => sum + item.calories,
        0
    );

    res.render("workout", {
        data: null,
        totalCalories
    });
});

router.post("/", async (req, res) => {
    const query = req.body?.search || "";

    if (!query) {
        return res.render("workout", {
            data: [],
            error: "Please enter a search term"
        });
    }

    try {
        const response = await axios.get(
            `https://world.openworkoutfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
        );
const products = response.data.products.map(item => {
    return {
        name: item.product_name || "Unknown",
        calories: item.nutriments && item.nutriments["energy-kcal_100g"]
            ? item.nutriments["energy-kcal_100g"]
            : 0
    };
});

        res.render("workout", { data: products, totalCalories: 0 });

    } catch (err) {
        res.render("workout", { data: [], error: "API error" });
    }
});

// ADD workout
router.post("/add", (req, res) => {
    const { name, calories } = req.body;

    calorieList.push({
        name,
        calories: Number(calories)
    });

    res.redirect("/workout");
});

module.exports = router;