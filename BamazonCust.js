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
