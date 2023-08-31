import Sequelize from "sequelize";
import mysql2 from 'mysql2'
const database = new Sequelize("sql12643089", "sql12643089", "gtwB8A5jCX", {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
  dialectModule: mysql2
});

try {
  database.authenticate();
  console.log("db is connected");
} catch (err) {
  console.log(err.message);
}

export default database;
