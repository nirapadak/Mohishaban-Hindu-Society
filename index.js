const { readdirSync } = require('fs');
const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');


require('dotenv').config();

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(hpp());




readdirSync("./src/routes").map(file => app.use('/api/v1', require(`./src/routes/${file}`)));


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
})


// Connect to MongoDB ==============================second =====
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    console.log(`mongoDb connect Successfully`);
  } catch (err) { 
    console.log(`Error connecting to MongoDB: ${err.message}`);
  }

}
mongoConnect().then(() => {
  // App is running and listening on port 5000 ==================
  app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
  })
}).catch(err => console.log(`mongoose connect Error : ${err}`))

















