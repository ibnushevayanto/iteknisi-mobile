const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define("order_upload", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nama_file: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.BIGINT,
  },
  mimeType: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
});
