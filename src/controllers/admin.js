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


exports.deleteUsersMuli = async(req, res) => {
  const { userIds } = req.body;

   // Validate each userId
  const areValidIds = userIds.every(id => mongoose.Types.ObjectId.isValid(id));
  
  if (!areValidIds) {
    return res.status(400).json({
      success: false,
      message: 'One or more user IDs are invalid'
    });
  }

  // Assuming you have a User model
  UserModel.deleteMany({ _id: { $in: userIds } })
    .then(() => res.status(200).send({ message: 'Users deleted successfully' }))
    .catch(err => res.status(500).send({ message: 'Error deleting users', error: err }));
}