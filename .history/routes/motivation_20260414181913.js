const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("quotes page working 💪");
});
router.post("/", async (req, res) => {
    const query = req.body.search;

    try {
        const response = await axios.get(
            "https://wger.de/api/v2/quotesinfo/?language=2&limit=20"
        );

        let results = response.data.results.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            return res.render("quotes", {
                data: [],
                error: "No quotess found 😕"
            });
        }

        res.render("quotes", { data: results, error: null });

    } catch (err) {
        res.render("quotes", {
            data: [],
            error: "API failed. Try again later ⚠️"
        });
    }
});
module.exports = router;