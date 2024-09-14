const cloudinary = require('cloudinary').v2;
const UserModel = require('../../model/userRegister');

const { users } = require("../services/towUser");




exports.getUsers = async (req, res) => {
  res.json({
    "name": "user",
    "email": "user@example.com",
  })
  
}

exports.TowUsers= async (req, res) => {
  res.send(users);
}


// upload image to cloudinary and save to database =====================================================
exports.profileCreate =  async(req, res) => {
  

  try {
    await cloudinary.uploader.upload(req.file.path, async (error, result) => {
    
      if (error) {
        console.error(error);
        return res.status(500).send('Error uploading file to Cloudinary');
      } else {
     
        console.log(result);
      
      const data = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        image: result.url,
      })
    
      
         res.status(200).json({
        message: 'File uploaded successfully',
        result: result,
        data: data,
    
      })
      }

      

     

    });
  } catch (e) {
    res.json({
      success: false,
      message: 'Error uploading file',
      error: e,
    })
  }
 
}


// get data from profile ==========================
exports.profileData = async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    res.json({
      success: true,
      data: data,
    })
    
  } catch (e) { 
    res.json({
      success: false,
      message: 'Error fetching data from users profile',
      error: e,
    })
  }
}