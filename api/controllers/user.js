const UserAlamat = require("../models/user_alamat");
const User = require("../models/user");
const validation = require("../utils/validationBody");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usergroup = require("../models/usergroup");
const fileHelper = require("../utils/file");
const { Op } = require("sequelize");
const { joinFileToBaseURL } = require("../utils/index");

exports.login = async (req, res, next) => {
  try {
    validation(req);

    const email = req.body.email;
    const password = req.body.password;
    const resultUser = await User.findOne({
      where: { email },
      include: [Usergroup, UserAlamat],
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

    const responseLogin = {
      nama: resultUser.nama,
      email: resultUser.email,
      image: joinFileToBaseURL(req, resultUser.image),
      usergroup_id: resultUser.usergroup.id,
      usergroup: resultUser.usergroup.usergroup,
      telp: resultUser.telp,
      is_active: resultUser.is_active,
      alamat: resultUser.users_alamats,
      id: resultUser.id.toString(),
    };

    const token = jwt.sign(responseLogin, "jwt-token-iteknisi", {
      expiresIn: "1h",
    });
    responseLogin.token = token;

    return res.status(200).json(responseLogin);
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

    const resultUser = await User.findOne({
      where: { id: user.id },
      include: [Usergroup, UserAlamat],
    });

    const responseDaftar = {
      nama: resultUser.nama,
      email: resultUser.email,
      image: null,
      usergroup_id: resultUser.usergroup.id,
      usergroup: resultUser.usergroup.usergroup,
      telp: resultUser.telp,
      is_active: resultUser.is_active,
      alamat: resultUser.users_alamats,
      id: resultUser.id.toString(),
    };

    const token = jwt.sign(responseDaftar, "jwt-token-iteknisi", {
      expiresIn: "1h",
    });
    responseDaftar.token = token;

    return res.status(200).json(responseDaftar);
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

    res.json({
      message: "Data ditemukan",
      data: {
        ...userData.dataValues,
        image: joinFileToBaseURL(req, userData.dataValues.image),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.simpanUser = async (req, res, next) => {
  try {
    validation(req);

    const userId = req.user.id;
    const nama = req.body.nama;
    const telp = req.body.telp;
    const email = req.body.email;
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
      user.telp = telp;
      if (user.email !== email) {
        user.is_active = 0;
      }
      user.email = email;

      if (req.file) {
        if (user.image) {
          fileHelper.deleteFile(user.image);
        }
        user.image = req.file.path;
        user.image_name = req.file.originalname;
        user.image_type = req.file.mimetype;
        user.image_size = req.file.size;
      }

      await user.save();

      for (const itemAlamat of alamat) {
        if (itemAlamat.id) {
          const dataAlamat = await UserAlamat.findByPk(itemAlamat.id);
          dataAlamat.alamat = itemAlamat.alamat;
          dataAlamat.latitude = itemAlamat.latitude;
          dataAlamat.longitude = itemAlamat.longitude;
          dataAlamat.deskripsi = itemAlamat.deskripsi;
          dataAlamat.isDefault = +!!itemAlamat.isDefault;
          await dataAlamat.save();
        } else {
          await UserAlamat.create({
            alamat: itemAlamat.alamat,
            latitude: itemAlamat.latitude,
            longitude: itemAlamat.longitude,
            deskripsi: itemAlamat.deskripsi,
            isDefault: +!!itemAlamat.isDefault,
            userId: user.id,
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
      attributes: ["id", "nama", "email", "telp"],
    });

    for (const itemUser of allUser) {
      const alamat = await UserAlamat.findOne({
        where: { userId: itemUser.id, isDefault: 1 },
        attributes: ["id", "alamat", "deskripsi", "latitude", "longitude"],
      });

      itemUser.dataValues.alamat = alamat?.dataValues;
    }

    res.json({ message: "Berhasil mendapatkan data", data: allUser });
  } catch (error) {
    next(error);
  }
};

exports.ubahKataSandi = async (req, res, next) => {
  try {
    validation(req);

    const password_lama = req.body.password_lama;
    const password_baru = req.body.password_baru;
    const dataUser = await User.findByPk(req.user.id);

    const isPasswordEqual = await bcryptjs.compare(
      password_lama,
      dataUser.password
    );
    if (!isPasswordEqual) {
      const error = new Error("Password salah");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcryptjs.hash(password_baru, 12);
    dataUser.password = hashedPassword;
    await dataUser.save();

    res.json({ message: "Berhasil mengubah kata sandi user" });
  } catch (error) {
    next(error);
  }
};
