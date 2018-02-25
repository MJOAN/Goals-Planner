const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");
const routes = require("./routes/routes.js");

const PORT = process.env.PORT || 3306;

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//app.use(routes);
require("./routes/routes.js")(app);
require("./database/config.json");

app.listen(PORT, function() {
    console.log("listening on port", PORT);
})