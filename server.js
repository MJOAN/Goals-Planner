var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "goals_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.render("index", { goals: data });
    });
});


// CREATE
app.post("/goal", function(req, res) {
    connection.query("INSERT INTO goals (goal) VALUES (?)", [req.body.goal], function(err, result) {
        if (err) {
            return res.status(500).end();
        }
        console.log("create goal set:", req.body.goal)
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});


// GET ALL
app.get("/goals", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.json(data);
    });
});


// UPDATE
app.put("/goal/:id", function(req, res) {
    connection.query("UPDATE goals SET goals = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
        } else if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// DELETE
app.delete("/goal/:id", function(req, res) {
    connection.query("DELETE FROM goals WHERE id = ?", [req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
        } else if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


app.listen(PORT, function() {
    console.log("listening on port", PORT);
})