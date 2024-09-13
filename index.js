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


// file name and destination ===========================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({ storage })






const users = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
}

app.get('/', (req, res) => {
  res.send(users);
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  

  res.json(req.file)


})



app.listen(port, () => {
  console.log(`listening on port: http://localhost:${port}`);
})