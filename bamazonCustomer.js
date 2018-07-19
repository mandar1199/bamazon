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
    connection.end;
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
        itemRequest(res);
    });
    //call input function
}
//input function to be run directly under the table
function itemRequest(res) {
    inquirer.prompt([{
        //first request for input from user
        name: "requestId",
        type: "input",
        message: "Please enter the ID number of the item you wish to purchase.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }else {
                return false;
                console.log("\nInsufficient ID number entered. \nPlease enter the ID number of the item you wish to purchase, as it appears on the table.");
            }
        }
    }, {
        //second request for input from user
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
                console.log("\nPlease enter a valid quantity of the item woudld like to purchase.");
            }
        }
    //accepthing and using inputs from user
    //function(answer) vs. function(input)?
    }]).then(function (answer) {
        var inputId = (answer.requestId) - 1;
        var inputQuantity = parseInt(answer.requestQuantity);
        var total = parseFloat(((res[inputId].price)*inputQuantity).toFixed(2));

        //if suffcient quantity display  total and thank you 
        if(res[inputId].stock_quantity >= inputQuantity) {
            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: (res[inputId].stock_quantity - inputQuantity)},
                {id: answer.requestId}
            ],function (err, result) {
                if (err) throw err;
                console.log("The total for your order is $" + total.toFixed(2) + " Thank you for choosing Bamazon! \n Your order will be shipped to you in 3-5 business days.");
            });
        //else display "cannot fill"
        }else {
            console.log("Our apologies! Order cannot be filled due to insufficient stock.")
        }
        //something else?
        additionalRequest();
    })
}
//whether the order is placed or not "Would you like something else?"
function additionalRequest() {
    //confirm input for yes or no for another order
    inquirer.prompt([{
        name: "additionalItem",
        type: "confirm",
        message: "Would you like to place another order?"
    }]).then(function (answer) {
        //if yes take back to the beggining 
        console.log(answer.additionalItem);
        if(answer.additionalItem) {
            showTable();
        }else {
            console.log("Thank you! Goodbye!")
        }
    })
}