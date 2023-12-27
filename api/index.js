const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const path = require("path");
const {
  defaultDataUser,
  defaultDataUsergroup,
  defaultDataUserAlamat,
} = require("./constant/data");

global.__basedir = __dirname;

app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.use((error, req, res, next) => {
  const status = error?.statusCode || 500;
  const message = error?.message || "Gagal memproses API";
  res.status(status).json({ message });
});

const User = require("./models/user");
const UserAlamat = require("./models/user_alamat");
const UserGroup = require("./models/usergroup");
const OrderTransaksi = require("./models/order_transaksi");
const Order = require("./models/orders");
const OrderUpload = require("./models/order_upload");

UserAlamat.belongsTo(User);
User.hasMany(UserAlamat);

User.belongsTo(UserGroup);
UserGroup.hasMany(User);

OrderTransaksi.belongsTo(User);
User.hasMany(OrderTransaksi);

Order.belongsTo(UserAlamat);
UserAlamat.hasMany(Order);

OrderUpload.belongsTo(Order);
Order.hasMany(OrderUpload);

// * DB Configuration
const sequelize = require("./utils/database");
sequelize
  .sync()
  .then(async () => {
    const dataUsergroup = await UserGroup.count();
    if (!dataUsergroup) {
      await UserGroup.bulkCreate(defaultDataUsergroup);
    }

    const dataUser = await User.count();
    if (!dataUser) {
      const dataUser = await defaultDataUser();
      await User.bulkCreate(dataUser);
      await UserAlamat.bulkCreate(defaultDataUserAlamat);
    }

    return true;
  })
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.error(err));
