const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

module.exports = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  kd_order: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mdltp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kategori: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pelanggan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  teknisi_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  jnslyn: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deskripsi: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});
