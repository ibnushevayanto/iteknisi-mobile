const multer = require("multer");
const fileStorage = (storage) =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/" + storage); // ! First parameter is error handler, whichh is function for handling an error
    },
    filename(req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
  });

module.exports = (allowedFormatFile = [], folder) => {
  return multer({
    storage: fileStorage(folder),
    fileFilter(req, file, cb) {
      if (allowedFormatFile.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
};
