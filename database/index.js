const mysql = require("mysql");

// Localhost
const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommania",
  dateStrings: "date",
});

module.exports = con;
