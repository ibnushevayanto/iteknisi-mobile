const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define(
  "usergroup",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    usergroup: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
