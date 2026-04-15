const axios = require("axios");

async function searchworkout(query) {
    const response = await axios.get(
        `https://world.openworkoutfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
    );

    return response.data.products;
}
router.get("/", (req, res) => {
    const totalCalories = calorieList.reduce((sum, item) => sum + item.calories, 0);

    res.render("workout", {
        data: null,
        totalCalories
    });
});
router.post("/add", async (req, res) => {
    const { name, calories } = req.body;

    calorieList.push({
        name,
        calories: Number(calories)
    });

    res.redirect("/workout");
});
module.exports = { searchworkout };