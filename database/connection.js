var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 3306,
    host: "t89yihg12rw77y6f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "x2nslg2srpk4dbg1",
    password: "riw9wzi0dkdf9l7e",
    database: "dyacgh3cxp6tc4o8"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;