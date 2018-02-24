const express = require("express");
const app = express();
const connection = require("./database/connection.js")

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
            return res.status(500).end();
        } else if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})