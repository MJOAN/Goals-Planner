var mysql = require("mysql");

var source = {
    // localhost
    localhost: {
        port: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "goals_db"
    },

    // jawsDB
    jawsDB: {
        port: 3306,
        host: "t89yihg12rw77y6f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "x2nslg2srpk4dbg1",
        password: "riw9wzi0dkdf9l7e",
        database: "dyacgh3cxp6tc4o8"
    }
};

const connection = mysql.createConnection(source.jawsDB);

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;