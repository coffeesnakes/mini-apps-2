const axios = require("axios");

const getClosingPrices = (currency, start, end, callback) => {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`
    )
    .then((response) => callback(null, response.data.bpi))
    .catch((error) => callback(error));
};

module.exports = { getClosingPrices };
