const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const upload = require("../utils/upload");

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("masih kosong")
    .isEmail()
    .normalizeEmail()
    .withMessage("tidak valid")
    .isLength({ max: 255 })
    .withMessage("maximal panjang karakter 255"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("masih kosong")
    .isLength({ max: 255 })
    .withMessage("maximal panjang karakter 255"),
  authController.login
);

router.post(
  "/simpan-user",
  upload(["image/png", "image/jpg", "image/jpeg"], "users").single("foto"),
  body("email")
    .notEmpty()
    .withMessage("masih kosong")
    .isEmail()
    .normalizeEmail()
    .withMessage("tidak valid")
    .isLength({ max: 255 })
    .withMessage("maximal panjang karakter 255"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("masih kosong")
    .isLength({ max: 255 })
    .withMessage("maximal panjang karakter 255"),
  body("nama")
    .trim()
    .notEmpty()
    .withMessage("masih kosong")
    .isLength({ max: 255 })
    .withMessage("maximal panjang karakter 255"),
  authController.simpanUser
);

module.exports = router;
