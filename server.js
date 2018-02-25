const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const routes = require("./routes/routes.js");


app.use(express.static(__dirname + "/public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/", routes);

require("./database/config.json");
require("./database/connection.js");

const port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log("listening on port", port);
})