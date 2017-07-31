//npm packages and modules
const mysql = require("mysql");
const inquirer = require("inquirer");
const colors = require("colors");
const  table = require("cli-table");

//grabbing the key
var keys = require("./keys.js");

var connection = mysql.createConnection(keys.connection); /**Documentation npm mysql**/

//check my connection
connection.connect(function(err){
  if(err) throw err;
});

function selection(){
  connection.query("SELECT * FROM products", function(err,res){
    //error
    if (err) throw (err);

    //new TABLE
    var table = new table({
      head: ["Product ID".blue, "Product Name".blue, "Department Name".blue, "Price".trap, "Quantity".underline.red],
      //input col-width
      colWidth:[13,20,20,10,10],
    });

    //for loop for the table contents
    for(var i= 0; i<res.length; i++){
      //push to the Table in the response
      table.push(
        [res[i].itemID, res[i].ProductName, res[i].DepartmentName, parseFloat(res[i].Price).toFixed(2), res[i].StockQuantity]
      );
    }

    //check
    console.log(table.toString());


    //now inquire for purchase
    inquirer.prompt([ /**documentation from npm inquirer**/
      {
        type: "number",
        message: "What item would you like to purchase? Please use the Product ID.",
        name: "itemNumber"
      },

      {
        type: "number",
        message: "How many would you like?",
        name: "howMany"
      },

    //promise (after they do this)
    ]).then(function(user){

      //query and join the table
      connection.query("SELECT * FROM products JOIN departments ON products.DepartmentName = departments.DepartmentName", function(err, res){
        if(err) throw err;


        if(res[user.itemNumber -1].StockQuantity > user.howMany){

          //new quantity
          var newQuantity = parseInt(res[user.itemNumber -1].StockQuantity)- parseInt(user.howMany);

          // new total
          var total = parseFloat(user.howMany) * parseFloat(res[user.itemNumber -1].Price);

          total = total.toFixed(2);

          //dept total
          var deptTotal = parseFloat(total) + parseFloat(res[user.itemNumber -1].TotalSales);
          deptTotal= deptTotal.toFixed(2);

          //query pass in objects
          connection.query("UPDATE departments SET ? WHERE ?", [{
            TotalSales: deptTotal
          },{
            DepartmentName: res[user.itemNumber -1].DepartmentName
          }], function(err,res){});

          //query again
          connection.query("UPDATE products SET ? WHERE ?", [{
            StockQuantity: newQuantity
          },{
            itemID: user.itemNumber
          }],function(err,res){
            if(err) throw err;

            //log out how much you have purchased and the price
            console.log("Here is your order " + user.howMany + "" + res[user.itemNumber -1].ProductName + "(s) has been placed.");
            console.log("Your total is $ " + total);

             /**might have to put order function before (hoisting issue?)**/
            orderMore();

          });

        }else {
          console.log("We're sorry, only " + res[user.itemNumber -1].StockQuantity + " is in stock.");

          //Again,might be a hoisting issue
          orderMore();
        }

      });


    });


  });

}


//orderMore
function orderMore(){
  inquirer.prompt([
    {
      type: "confirm",
      message: "Anymore orders??",
      name: "purchaseMore"
    },

  ]).then(function(user){
    if(user.purchaseMore){
      selection();
    }
    exit();
  })

}

//exit
function exit() {
  connection.end();
  console.log("Have a great day and thank you for ordering from BAMAZON!")
}

//call selection
selection();
