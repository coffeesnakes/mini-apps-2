const models = require("./models.js");

const coindeskAPI = (req, res) => {
  const { currency, start, end } = req.query;
  models.getClosingPrices(currency, start, end, (error, data) => {
    if (error) res.status(400).send(error);
    res.status(200).send(data);
  });
};

module.exports = { coindeskAPI };
