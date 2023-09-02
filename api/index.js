const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
  const status = error?.statusCode || 500;
  const message = error?.message || "Gagal memproses API";
  res.status(status).json({ message });
});

app.use("/auth", authRoutes);

// * DB Configuration
const sequelize = require("./utils/database");
sequelize
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.error(err));
