const bcryptjs = require("bcryptjs");

exports.defaultDataUsergroup = [
  {
    usergroup: "Super Admin",
  },
  {
    usergroup: "Teknisi",
  },
  {
    usergroup: "Pelanggan",
  },
];

exports.defaultDataUser = async () => {
  try {
    const data = [
      {
        nama: "Superadmin",
        email: "admin@iteknisi.com",
        password: "a",
        telp: "081386909757",
        is_active: true,
        usergroupId: 1,
      },
      {
        nama: "Teknisi 1",
        email: "teknisi1@iteknisi.com",
        password: "a",
        telp: "081386909757",
        is_active: true,
        usergroupId: 2,
      },
      {
        nama: "Teknisi 2",
        email: "teknisi2@iteknisi.com",
        password: "a",
        telp: "081386909757",
        is_active: true,
        usergroupId: 2,
      },
      {
        nama: "Pelanggan",
        email: "pelanggan@iteknisi.com",
        password: "a",
        telp: "081386909757",
        is_active: true,
        usergroupId: 3,
      },
    ];

    for (const item of data) {
      item.password = await bcryptjs.hash(item.password, 12);
    }

    console.log(data);
    return data;
  } catch (error) {
    return [];
  }
};

exports.defaultDataUserAlamat = [
  {
    alamat: "Default Rumah Teknisi 1",
    deskripsi: "Perumahan taman walet blok wrb",
    latitude: "-6.142677199999999",
    longitude: "106.5320685",
    isDefault: 1,
    userId: 2,
  },
  {
    alamat: "Default Rumah Teknisi 2",
    deskripsi: "Perumahan grand batavia",
    latitude: "-6.138246199999999",
    longitude: "106.5373937",
    isDefault: 1,
    userId: 3,
  },
  {
    alamat: "Default Rumah Pelanggan",
    deskripsi: "Perumahan taman walet blok gwb 3 no 18",
    latitude: "-6.142328214655273",
    longitude: "106.53835460543633",
    isDefault: 1,
    userId: 4,
  },
];
