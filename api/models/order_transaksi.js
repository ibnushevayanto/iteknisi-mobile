const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const MasterKondisi = require("./master_kondisi");

module.exports = sequelize.define(
  "order_transaksi",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    kondisi_sebelum: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: MasterKondisi,
        key: "id",
      },
    },
    kondisi_sesudah: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: MasterKondisi,
        key: "id",
      },
    },
    catatan: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    biaya: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
