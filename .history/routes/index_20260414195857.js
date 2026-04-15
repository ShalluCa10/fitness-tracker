const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/", async (req, res) => {
    const response = await axios.get(
        "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20"
    );

    const exercises = response.data.results;

    res.render("home", { exercises });
});
module.exports = router;