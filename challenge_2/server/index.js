const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.listen(port, () => console.log(`Now listening on port ${port}`));

app.get("/api/historical-data", controllers.coindeskAPI);
