const multer = require("multer");
const { BadRequest } = require("./Errors");
const fileMaxSize = require("./Configs").getFileMaxSize();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports.multerUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new BadRequest("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: fileMaxSize },
}).single("file");
