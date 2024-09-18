const { decodedToken } = require('./token');
const UserModel = require('../model/userRegister')

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  } 

  try {
    const decoded = decodedToken(token);
    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};


// user Authentication for Admin check =================================
exports.isAdmin = async(req, res, next) => {
  try {

    const checkUser = await UserModel.findById(req.user.id);
    console.log(checkUser);
      if (checkUser.admin !== 1) {
      res.status(404).json({error: "authorization error", message: "You are not Admin"})
    } else {
      next();
    }

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised Admin user! mysterious error",
    });
  }
}
