const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3306;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

const routes = require("./routes/routes.js");
app.use("/", routes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

