const UserModel = require('../model/userRegister');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



exports.deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;

     const ObjuserId = new ObjectId(id); 

    const deletedUsers = await UserModel.findByIdAndDelete({_id: ObjuserId});

    if (!deletedUsers) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      numberOfDeletedUsers: deletedUsers.deletedCount,
    }
      );
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}

