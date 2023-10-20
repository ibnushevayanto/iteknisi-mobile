const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define(
  "master_merk",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    merk: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
