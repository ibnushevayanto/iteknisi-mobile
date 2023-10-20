const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define(
  "master_kondisi",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nama_kondisi: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
