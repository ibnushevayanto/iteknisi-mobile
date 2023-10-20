const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define(
  "users_alamat",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    alamat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
