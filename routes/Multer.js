const multer = require("multer")
const { v4: uuidv4 } = require('uuid');
//jo file loge uska path dikhane ke liye tmhe ye krna hoga pehle path require kro
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        const uniquename = uuidv4();
        //path require krne ke baad tmhe ye krna padega, that is a must
      cb(null,uniquename + path.extname(file.originalname))
    }
  });

  const upload = multer({storage: storage})

  module.exports = upload;