const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const config = require("./config.json");
const fs = require("fs");
const menuRoutes = require(`./routes/menuRoutes`);
const custTableRoutes = require("./routes/custTableRoutes");
const orderRoutes = require("./routes/orderRoutes");
let landingContent = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

app.get(config.server.base, (req, res) => {
  res.setHeader("content-type", "text/html");
  res.status(200).end(landingContent);
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(config.routes.item.base, menuRoutes);
app.use(config.routes.custTable.base, custTableRoutes);
app.use(config.routes.orders.base, orderRoutes);

app.listen(config.server.port, () => {
  console.log(`server started listening on port: ${config.server.port}`);
});
