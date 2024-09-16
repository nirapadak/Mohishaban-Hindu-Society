const cloudinary = require('cloudinary').v2;
const UserModel = require('../model/userRegister');
const jwt = require('jsonwebtoken');

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
        number: req.body.number,
        image: result.url,
        familyMember: req.body.familyMember,
      })
        console.log(data);
    
        // create token ============================
        let token = jwt.sign({ email: data.email, id:data._id.toString(), image: data.image }, process.env.TOKEN_KEY, { expiresIn: '7d' })

        // token is created ============================
        console.log(token);
      
        res.status(200).json({
        message: 'File uploaded successfully',
        result: result,
        data: data,
        auth_token: token,
    
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
    const token = req.user;
  
  
    console.log(token.id);
    if (!token) { 
      return res.status(403).json({ success: false, message: 'user unouthorized' });
    }

     const data = await UserModel.findById({_id: token.id});
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





// User profile delete ==================================
exports.profileDelete = async (req, res) => { 
  try {

    const {email, id, image} = req.user;
    const urlArray = image.split('/');
    const imgName = urlArray[urlArray.length - 1];
    const imageName = imgName.split('.')[0];
    console.log(imageName);

    
    await cloudinary.uploader.destroy(imageName, (err, response) => {
      if (err) {
        console.error(err);
        
      } else {
        console.log(response);

      }

    });
  
    
    
    const data = await UserModel.findByIdAndDelete(id)
      
    return res.json({
      message: 'User profile deleted successfully',
      success: true,
      data: data,
    })
    



  } catch (e) {
    return res.json({
      success: false,
      message: 'Error deleting user profile',
      error: e,
    })
  }
}