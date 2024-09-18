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

    const data = await UserModel.findById({ _id: token.id });
    

    if (!data) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

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

// Login profile =======================================

exports.profileLogin = async (req, res) => {
  const { email, number } = req.body;

  try {
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    console.log(checkUser.number);
    if (checkUser.number != number) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }
  
  

 

    const token = jwt.sign(
      {
        email: checkUser.email,
        id: checkUser._id.toString(),
        image: checkUser.image,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "7d" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: false }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     admin: checkUser.admin,
    //     id: checkUser._id,
    //     name: checkUser.name,
    //   },
    // });

      res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        admin: checkUser.admin,
        id: checkUser._id,
        name: checkUser.name,
        },
      token: token
    });


  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


// User profile for cookies =======================================
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};



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

//================================= admin user ===================================

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      success: true,
      message: 'All users fetched successfully',
      numberOfUsers: users.length,
      data: users,
    }
      );
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};