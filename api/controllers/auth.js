const User = require("../models/user");
const validation = require("../utils/validationBody");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    validation(req);

    const email = req.body.email;
    const password = req.body.password;
    const resultUser = await User.findOne({ where: { email } });
    if (!resultUser) {
      const error = new Error("Email belum terdaftar");
      error.statusCode = 422;
      throw error;
    }

    const isPasswordEqual = await bcryptjs.compare(
      password,
      resultUser.password
    );
    if (!isPasswordEqual) {
      const error = new Error("Password salah");
      error.statusCode = 422;
      throw error;
    }

    const token = jwt.sign(
      {
        email: resultUser.email,
        nama: resultUser.nama,
        image: resultUser.image,
        id: resultUser.id.toString(),
      },
      "jwt-token-iteknisi",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      nama: resultUser.nama,
      email: resultUser.email,
      image: resultUser.image,
    });
  } catch (err) {
    next(err);
  }
};

exports.simpanUser = async (req, res, next) => {
  try {
    validation(req);

    const email = req.body.email;
    const nama = req.body.nama;
    const password = req.body.password;
    const telp = req.body.telp || null;

    const isEmailRegistered = await User.findOne({ where: { email } });
    if (isEmailRegistered) {
      if (!resultUser) {
        const error = new Error("Email sudah digunakan");
        error.statusCode = 422;
        throw error;
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      nama,
      telp,
      image: req.file?.path || null,
      is_active: 1,
    });
    res.status(201).json({
      message: "User berhasil dibuat",
      data: {
        email: user.email,
        nama: user.nama,
        telp: user.telp,
        image: user.image,
        is_active: user.is_active,
      },
    });
  } catch (err) {
    next(err);
  }
};
