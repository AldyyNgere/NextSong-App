// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nextsong",
//   port: 3307,
//   authPlugins: {
//     mysql_clear_password: () => () => Buffer.from(""),
//   },
// });

// module.exports = pool;

const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = connection.promise();
