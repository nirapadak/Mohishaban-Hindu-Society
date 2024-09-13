const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// path exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

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


// cloudinary =======================================
const cloudinary = require('cloudinary').v2;

//config cloudinary ===============================
cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API,
  api_secret: process.env.SECRET,
});






const users = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
}

app.get('/', (req, res) => {
  res.send(users);
})

app.post('/api/upload', upload.single('file'), async(req, res) => {
  

  await cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error uploading file to Cloudinary');
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      result: result,
    })

  });
 
})



app.listen(port, () => {
  console.log(`listening on port: http://localhost:${port}`);
})