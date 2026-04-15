const axios = require("axios");

async function searchquotess(query) {
    const response = await axios.get(
        `https://wger.de/api/v2/quotesinfo/?language=2&limit=20`
    );

    return response.data.results.filter(ex =>
        ex.name.toLowerCase().includes(query.toLowerCase())
    );
}

module.exports = { searchquotess };