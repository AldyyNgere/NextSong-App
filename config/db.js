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
  uri: process.env.MYSQL_URL,
});

module.exports = connection.promise();
