const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=10"
        );

        const exercises = response.data.results; FIX HERE

        res.render("workout", { exercises }); // send to Pug properly
    } catch (error) {
        console.error(error.message);
        res.send("Error fetching workouts");
    }
});
router.get("/", async (req, res) => {
  const quoteRes = await axios.get("https://type.fit/api/quotes");
  // router.get("/", async (req, res) => {
  // try {
//     const response = await axios.get(
//       "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"
//     );

//     const exercises = response.data.results || [];

//     // group by category
//     const categoriesMap = {};

//     exercises.forEach(ex => {
//       const category = ex.category?.name || "Other";

//       if (!categoriesMap[category]) {
//         categoriesMap[category] = {
//           name: category,
//           image: ex.images?.[0]?.image || null,
//           count: 0
//         };
//       }

//       categoriesMap[category].count++;
//     });

//     const categories = Object.values(categoriesMap);

//     res.render("home", { categories });

//   } catch (err) {
//     console.log(err);
//     res.render("home", { categories: [] });
//   }
// });


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