const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("workout page working 🍎");
});
router.post("/", async (req, res) => {
    const query = req.body.search;

    try {
        const response = await axios.get(
            `https://world.openworkoutfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
        );

        const products = response.data.products;

        if (!products || products.length === 0) {
            return res.render("workout", {
                data: [],
                error: "No workout found 😕"
            });
        }

        res.render("workout", { data: products, error: null });

    } catch (err) {
        res.render("workout", {
            data: [],
            error: "API failed ⚠️"
        });
    }
});
module.exports = router;