const multer = require('multer');




// file name and destination ===========================

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, uploadDir);
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({ storage })

module.exports = upload