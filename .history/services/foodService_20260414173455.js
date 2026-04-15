const axios = require("axios");

async function searchworkout(query) {
    const response = await axios.get(
        `https://world.openworkoutfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
    );

    return response.data.products;
}

module.exports = { searchworkout };