const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const totalCalories = dashboard.workouts.reduce(
        (sum, item) => sum + item.calories,
        0
    );

    res.render("dashboard", {
        workouts: dashboard.workouts,
        totalCalories
    });
});

module.exports = router;