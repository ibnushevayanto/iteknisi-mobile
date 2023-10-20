const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
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
  userController.login
);

router.post(
  "/daftar",
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
  body("telp")
    .trim()
    .notEmpty()
    .withMessage("masih kosong")
    .isLength({ max: 13 })
    .withMessage("maximal panjang karakter 13"),
  userController.daftarUser
);

router.post(
  "/simpan",
  isAuth,
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
  body("telp")
    .trim()
    .notEmpty()
    .withMessage("masih kosong")
    .isLength({ max: 13 })
    .withMessage("maximal panjang karakter 13"),
  userController.simpanUser
);

router.get("/", isAuth, userController.profileUser);

router.post(
  "/update-status",
  isAuth,
  body("userid").notEmpty().withMessage("masih kosong"),
  body("status").notEmpty().withMessage("masih kosong"),
  userController.toggleAktifUser
);

router.get("/semua", isAuth, userController.semuaUser);

module.exports = router;
