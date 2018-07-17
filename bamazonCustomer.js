var mysql = require('mysql');
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "confused101",
    database: "bamazondb",
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    showTable();
});

function showTable() {
    console.log("Welcome to Bamazon!  \n" )
    connection.query("SELECT * FROM products", function(err, res) {
        const table = new Table({
            head: ["id", "product_name", "department_name", "price", "stock_quantity"]
        });
        console.log("Best Selling Items");
        for (var i =0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        if (err) throw err;
        console.log(res);
    });
}