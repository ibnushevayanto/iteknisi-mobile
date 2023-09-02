const Sequelize = require("sequelize");

module.exports = new Sequelize("db_iteknisi", "root", "", {
  dialect: "mariadb",
  host: "localhost",
});
