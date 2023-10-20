const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const status = error?.statusCode || 500;
  const message = error?.message || "Gagal memproses API";
  res.status(status).json({ message });
});

const User = require("./models/user");
const UserAlamat = require("./models/user_alamat");
const UserGroup = require("./models/usergroup");
const OrderTransaksi = require("./models/order_transaksi");
const MasterMerk = require('./models/master_merk')
const Order = require('./models/orders')

UserAlamat.belongsTo(User);
User.hasMany(UserAlamat);

User.belongsTo(UserGroup);
UserGroup.hasMany(User);

OrderTransaksi.belongsTo(User);
User.hasMany(OrderTransaksi);

Order.belongsTo(MasterMerk)
MasterMerk.hasMany(Order)

Order.belongsTo(UserAlamat)
UserAlamat.hasMany(Order)

// * DB Configuration
const sequelize = require("./utils/database");
sequelize
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.error(err));
