var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "confused101",
    database: "bamazon_db",
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});