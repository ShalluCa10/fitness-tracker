const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    const response = await axios.get("https://wger.de/api/v2/exerciseinfo/");

    console.log(response.data); // 🔥 check real structure

    res.send(response.data);
});

module.exports = router;