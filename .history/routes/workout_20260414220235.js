const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:category", async (req, res) => {
  try {
    const categoryName = req.params.category;

    // Get exercises
    const response = await axios.get(
      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"
    );

    // Filter exercises by category name
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