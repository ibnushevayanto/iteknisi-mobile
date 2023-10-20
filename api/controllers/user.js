const UserAlamat = require("../models/user_alamat");
const User = require("../models/user");
const validation = require("../utils/validationBody");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usergroup = require("../models/usergroup");
const fileHelper = require("../utils/file");
const { Op } = require("sequelize");

exports.login = async (req, res, next) => {
  try {
    validation(req);

    const email = req.body.email;
    const password = req.body.password;
    const resultUser = await User.findOne({
      where: { email },
      include: Usergroup,
    });
    if (!resultUser) {
      const error = new Error("Email belum terdaftar");
      error.statusCode = 422;
      throw error;
    }

    if (!resultUser.is_active) {
      const error = new Error(
        "Akun sedang non aktive, hubungi admin untuk mengaktifkan kembali akun anda"
      );
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
        usergroup_id: resultUser.usergroup.id,
        usergroup: resultUser.usergroup.usergroup,
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
      usergroup_id: resultUser.usergroup.id,
      usergroup: resultUser.usergroup.usergroup,
      telp: resultUser.telp
    });
  } catch (err) {
    next(err);
  }
};

exports.daftarUser = async (req, res, next) => {
  try {
    validation(req);

    const email = req.body.email;
    const nama = req.body.nama;
    const password = req.body.password;
    const telp = req.body.telp || null;
    const usergroupId = req.body.usergroupid;

    const isEmailRegistered = await User.findOne({ where: { email } });
    if (isEmailRegistered) {
      const error = new Error("Email sudah digunakan");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      nama,
      telp,
      usergroupId,
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

exports.profileUser = async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: { id: req.user.id },
      include: [UserAlamat, Usergroup],
    });

    res.json({ message: "Data ditemukan", data: { ...userData.dataValues } });
  } catch (error) {
    next(error);
  }
};

exports.simpanUser = async (req, res, next) => {
  try {
    validation(req);

    const userId = req.user.id;
    const nama = req.body.nama;
    const email = req.body.email;
    const telp = req.body.telp;
    const alamat = JSON.parse(req.body.alamat);

    const isEmailRegistered = await User.findOne({ where: { email } });
    if (isEmailRegistered) {
      if (isEmailRegistered.id !== req.user.id) {
        const error = new Error("Email sudah digunakan");
        error.statusCode = 422;
        throw error;
      }
    }

    const user = await User.findByPk(userId);

    if (user) {
      user.nama = nama;
      user.email = email;
      user.telp = telp;

      if (req.file) {
        fileHelper.deleteFile(user.image);
        user.image = req.file.path;
      }

      await user.save();

      for (const itemAlamat of alamat) {
        if (itemAlamat.id) {
          const dataAlamt = UserAlamat.findByPk(itemAlamat.id);
          dataAlamt.alamat = itemAlamat.alamat;
          dataAlamt.latitude = itemAlamat.latitude;
          dataAlamt.longitude = itemAlamat.longitude;
          dataAlamt.deskripsi = itemAlamat.deskripsi;
          dataAlamt.isDefault = +!!itemAlamat.isDefault;
        } else {
          await UserAlamat.create({
            alamat: itemAlamat.alamat,
            latitude: itemAlamat.latitude,
            longitude: itemAlamat.longitude,
            deskripsi: itemAlamat.deskripsi,
            isDefault: +!!itemAlamat.isDefault,
          });
        }
      }

      res.json({ message: "Berhasil menyimpan data user" });
    } else {
      const error = new Error("User tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.toggleAktifUser = async (req, res, next) => {
  try {
    validation(req);

    const userid = req.body.userid;
    const status = req.body.status;
    const user = await User.findByPk(userid);

    user.is_active = status;
    await user.save();

    res.json({ message: "Berhasil mengubah data user" });
  } catch (error) {
    next(error);
  }
};

exports.semuaUser = async (req, res, next) => {
  try {
    const f_pencarian = req.query.f_pencarian;
    const f_usergroupid = req.query.f_usergroupid;

    // * Where Logic
    const paramsWhere = {};
    if (f_usergroupid) {
      paramsWhere.usergroupId = f_usergroupid;
    }
    if (f_pencarian) {
      paramsWhere[Op.or] = [
        {
          nama: {
            [Op.like]: `${f_pencarian}%`,
          },
        },
        {
          email: {
            [Op.like]: `${f_pencarian}%`,
          },
        },
        {
          telp: {
            [Op.like]: `${f_pencarian}%`,
          },
        },
      ];
    }
    // * End where logic

    const allUser = await User.findAll({
      where: paramsWhere,
    });

    res.json({ message: "Berhasil mendapatkan data", data: allUser });
  } catch (error) {
    next(error);
  }
};
