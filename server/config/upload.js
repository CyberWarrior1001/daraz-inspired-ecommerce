import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.path == "/upload/profile/pic") {
      cb(null, "./uploads/public/");
    } else if (req.path == "/upload/logo") {
      cb(null, "uploads/storePic");
    } else if (req.path == "/upload/banner") {
      cb(null, "uploads/storeBanners");
    } else if (req.path == "/upload/productImages") {
      cb(null, "uploads/productImages")
    }

  },

  filename: (req, file, cb) => {
    const newname = Date.now() + "_" + Math.round(Math.random() * 1e9);

    cb(null, newname + "_" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
