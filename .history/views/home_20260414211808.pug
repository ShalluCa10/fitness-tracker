const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    // QUOTES
    const quoteRes = await axios.get("https://type.fit/api/quotes");
    const banners = quoteRes.data.slice(0, 5).map(q => ({
      text: q.text,
      author: q.author || "Unknown"
    }));

    // WORKOUTS
    const workoutRes = await axios.get(
      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"
    );

    const exercises = workoutRes.data.results;

    // GROUP INTO CATEGORIES
    const map = {};

    exercises.forEach(ex => {
      const cat = ex.category?.name || "Other";

      if (!map[cat]) {
        map[cat] = {
          name: cat,
          count: 0,
          image: ex.images?.[0]?.image || null
        };
      }

      map[cat].count++;
    });

    const categories = Object.values(map);

    res.render("home", {
      banners,
      categories
    });

  } catch (err) {
    console.log(err);
    res.render("home", {
      banners: [],
      categories: []
    });
  }
});

module.exports = router;