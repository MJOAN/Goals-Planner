const express = require("express");
const router = express.Router();
const connection = require("../database/connection.js")

router.get("/", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500);
            console.log("err", err)
        }
        res.render("index", { goals: data });
        console.log("routes working for home")
    });
});


// CREATE
router.post("/goal", function(req, res) {
    connection.query("INSERT INTO goals (goal) VALUES (?)", [req.body.goal], function(err, result) {
        if (err) {
            return res.status(500);
            console.log("err", err)
        }
        console.log("create goal set:", req.body.goal)
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});


// GET ALL
router.get("/goals", function(req, res) {
    connection.query("SELECT * FROM goals;", function(err, data) {
        if (err) {
            return res.status(500);
            console.log("err", err)
        }
        console.log("routes working for get all")
        res.json(data);
    });
});


// UPDATE
router.put("/goal/:id", function(req, res) {
    connection.query("UPDATE goals SET goals = ? WHERE id = ?", [req.body.goal, req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500);
            console.log("err", err)
        } else if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404);
            console.log("err", err)
        } else {
            res.status(200);
            console.log("route working at update", req.body.goal)
        }
    });
});


// DELETE
router.delete("/goal/:id", function(req, res) {
    connection.query("DELETE FROM goals WHERE id = ?", [req.params.id], function(err, result) {
        if (err) {
            return res.status(500);
        } else if (result.affectedRows == 0) {
            return res.status(404);
        } else {
            res.status(200);
        }
    });
})


module.exports = router;