const { decodedToken } = require('./token');

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

