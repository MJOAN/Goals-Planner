const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3306;
const path = require("path");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const exphbs = require('express-handlebars');
const viewsPath = path.join(__dirname, 'views');

app.engine("handlebars", exphbs({ 
	defaultLayout: "main", 
	layoutsDir: viewsPath + "/layouts"
}));

app.set("view engine", "handlebars");

const routes = require("./routes/routes.js");
app.use("/", routes);

require("./database/config.json");
require("./database/connection.js");

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

