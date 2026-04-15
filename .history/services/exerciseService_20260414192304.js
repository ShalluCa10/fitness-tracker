const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("quotes", { data: null });
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

        if (!results.length) {
            return res.render("quotes", { data: [], error: "No results found" });
        }

        res.render("quotes", { data: results });

    } catch {
        res.render("quotes", { data: [], error: "API error" });
    }
});

module.exports = router;