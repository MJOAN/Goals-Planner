const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const connection = require("../database/connection.js")

router.get("/", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500).end();
            console.log("err")
        }
        res.render("index", { goals: data });
        console.log("goals data: ", data)
    });
});

// CREATE
router.post("/goal", function(req, res) {
    console.log("routes working for create")
    connection.query("INSERT INTO goals (goal) VALUES (?)", [req.body.goal], function(err, result) {
        if (err) {
            return res.status(500).end();
            console.log("err", err)
        }
        console.log("create goal set:", req.body.goal)
        console.log("routes working for create")
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});


// GET ALL
router.get("/goals", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500).end();
            console.log("err", err)
        }
        console.log("routes working for get all")
        res.json(data);
    });
});


// UPDATE
router.put("/goals/:id", function(req, res) {
    connection.query("UPDATE goals SET goal = ? WHERE id = ?", [req.body.goal, req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
            console.log("err line 53", err)
        } else if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
            console.log("err line 57", err)
        } else {
            res.status(200).end();
            console.log("route working at update", req.body.goal)
        }
    });
});


// DELETE
router.delete("/goals/:id", function(req, res) {
    console.log("req.params.id:", req.params.id)
    connection.query("DELETE FROM goals WHERE id = ?", [req.params.id], function(err, result) {
        if (err) {
            // return res.status(500).end();
            console.log("routes error line 72", err)
        } else if (result.affectedRows == 0) {
            // return res.status(404).end();
            console.log("routes error delete line 75", err)
        } else {
            res.status(200).end();
            console.log("routes working for delete")
        }    
    });
})


module.exports = router;
