const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const quoteRes = await axios.get("https://type.fit/api/quotes");
  const workoutRes = await axios.get(
    "https://wger.de/api/v2/exerciseinfo/?language=2&limit=10"
  );

  const banners = quoteRes.data.slice(0, 5).map((q, i) => ({
  text: q.text || "Fitness Motivation",
  author: q.author || "Unknown",
  image: "https://placehold.co/1200x400/png?text=Fitness+Motivation"
}));

  res.render("home", {
    banners,
    exercises: workoutRes.data.results || []
  });
});

module.exports = router;