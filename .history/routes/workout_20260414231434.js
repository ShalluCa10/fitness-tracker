const express = require("express");
const router = express.Router();
const axios = require("axios");
// DETAIL ROUTE 
router.get("/detail/:id", async (req, res) => {
  console.log("Detail route hit:", req.params.id);
  try {
    const exerciseId = req.params.id;

    const response = await axios.get(
      `https://wger.de/api/v2/exerciseinfo/${exerciseId}/?language=2`
    );

    const exercise = response.data;

    res.render("exercise-detail", { exercise });

  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// CATEGORY ROUTE AFTER
router.get("/:category", async (req, res) => {
  try {
    const categoryName = req.params.category;

    const response = await axios.get(
      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"
    );

    const exercises = response.data.results.filter(
      ex => ex.category.name.toLowerCase() === categoryName.toLowerCase()
    );

    res.render("workout", {
      exercises,
      category: categoryName
    });

  } catch (error) {
    console.log(error);
    res.render("workout", { exercises: [], category: "" });
  }
});

module.exports = router;