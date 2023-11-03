const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

module.exports = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telp: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_size: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
