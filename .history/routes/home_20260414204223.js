const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const quoteRes = await axios.get("https://type.fit/api/quotes");
  const workoutRes = await axios.get(
    "https://wger.de/api/v2/exerciseinfo/?language=2&limit=10"
  );

const banners = quoteRes.data.slice(0, 5).map(q => ({
  text: q.text,
  author: q.author || "Unknown"
}));

  res.render("home", {
    banners,
    exercises: workoutRes.data.results || []
  });
});

module.exports = router;