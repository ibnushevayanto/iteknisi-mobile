const sequelize = require("../utils/database");
const UserAlamat = require("../models/user_alamat");
const OrderUpload = require("../models/order_upload");
const { generateUniqueOrderCode } = require("../utils/others");
const Order = require("../models/orders");

exports.getTeknisiTerdekat = async (req, res, next) => {
  try {
    const alamatId = req.query.alamatId;
    const dataAlamat = await UserAlamat.findByPk(alamatId);

    const dataTeknisiTerdekat = await sequelize.query(
      `
      SELECT 
      ua.userId, 
      u.nama,
      u.image,
      ua.deskripsi,
      ua.latitude,
      ua.longitude,
      SQRT(
          POW(69.1 * (latitude - :latitude), 2) +
          POW(69.1 * (:longitude - longitude) * COS(latitude / 57.3), 2)) AS distance
      FROM users_alamat ua
      LEFT JOIN users u ON u.id = ua.userId 
      WHERE 
      u.usergroupId = 2 AND ua.isDefault = 1 AND u.is_active = 1
      HAVING distance < 6 
      ORDER BY distance
      LIMIT 1;
     `,
      {
        replacements: {
          latitude: dataAlamat.latitude,
          longitude: dataAlamat.longitude,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let data = null;
    if (dataTeknisiTerdekat.length) {
      data = dataTeknisiTerdekat[0];
    }

    res.json({
      message: "Berhasil mendaptkan data",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.simpanOrder = async (req, res, next) => {
  try {
    const mdltp = req.body.model_tipe;
    const kategori = req.body.kategori;
    const pelanggan_id = req.user.id;
    const teknisi_id = req.body.teknisi_id;
    const jnslyn = req.body.jenis_layanan;
    const deskripsi = req.body.deskripsi;
    const kd_order = generateUniqueOrderCode();
    const usersAlamatId = req.body.alamat_id;

    const order = await Order.create({
      mdltp,
      kategori,
      pelanggan_id,
      teknisi_id,
      jnslyn,
      deskripsi,
      kd_order,
      usersAlamatId,
    });

    const itemOrderUpload = [];
    for (const itemFile of req.files) {
      const resOrderUpload = await OrderUpload.create({
        orderId: order.id,
        nama_file: itemFile.filename,
        size: itemFile.size,
        mimeType: itemFile.mimetype,
        path: itemFile.path,
      });
      itemOrderUpload.push(resOrderUpload);
    }

    res.json({
      message: "Berhasil melakukan order",
      data: {
        order,
        upload: itemOrderUpload,
      },
    });
  } catch (error) {
    next(error);
  }
};
