const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");
const upload = require("../utils/upload");

router.get("/teknisi-terdekat", isAuth, orderController.getTeknisiTerdekat);
router.post(
  "/buat-order",
  upload(
    ["image/png", "image/jpg", "image/jpeg", "video/mp4", "video/quicktime"],
    "order_upload"
  ).array("bukti", 5),
  isAuth,
  orderController.simpanOrder
);

module.exports = router;
