const sequelize = require("../utils/database");
const UserAlamat = require("../models/user_alamat");

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
