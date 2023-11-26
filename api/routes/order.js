const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.get("/teknisi-terdekat", isAuth, orderController.getTeknisiTerdekat);

module.exports = router;
