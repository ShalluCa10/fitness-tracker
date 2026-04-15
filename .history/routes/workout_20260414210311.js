// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// router.get("/", async (req, res) => {
//     try {
//         const response = await axios.get(
//             "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20"
//         );

//         const exercises = response.data.results || [];

//         res.render("workout", { exercises });

//     } catch (error) {
//         console.error(error);
//         res.render("workout", { exercises: [] });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:category", async (req, res) => {
  try {
    const categoryName = req.params.category;

    const response = await axios.get(
      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=100"
    );

    const exercises = response.data.results || [];

    const filtered = exercises.filter(
      ex => ex.category?.name === categoryName
    );

    res.render("workout", {
      category: categoryName,
      exercises: filtered
    });

  } catch (err) {
    console.log(err);
    res.render("workout", {
      category: "Workout",
      exercises: []
    });
  }
});

module.exports = router;