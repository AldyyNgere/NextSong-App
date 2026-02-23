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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = connection.promise();
