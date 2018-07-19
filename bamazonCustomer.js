//npm installers
var mysql = require('mysql');
var inquirer = require("inquirer");
var Table = require("console.table");

//connection to database on mysql
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
    //console.log("connected as id" + connection.threadId + "\n");
    showTable();
});

//when bamazonCustomer.js is requested welcome and show best sellers table
function showTable() {
    console.log("Welcome to Bamazon!  \n" )
    connection.query("SELECT * FROM products", function(err, res) {
        // const table = new Table({
        //     head: ["id", "product_name", "department_name", "price", "stock_quantity"]
        // });
        console.log("Best Selling Items");
        for (var i =0; i < res.length; i++) {
            // table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        if (err) throw err;
        console.table(res);
    });
    //call input function
    itemRequest();
}
//input function to be run directly under the table
function itemRequest() {
    inquirer.prompt([{
        name: "requestId",
        type: "input",
        message: "Please enter the ID number of the item you wish to purchase.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }else {
                return false
            }
        }
    }, {
        name: "requestQuantity",
        type: "input",
        //how do i do something like ?
        //"There are " + res[i].stock_quantity + " 
        //of your requested item. Please enter the quantity of
        //this item you would like to purchase." 
        message: "Please enter the quantity of this item you would like to purchase.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }else {
                return false;
            }
        }
    }]).then(function (answer) {
        
    })
}