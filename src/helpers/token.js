const jwt = require('jsonwebtoken');

exports.EncodedToken = (email, user_id, image) => {
   return jwt.sign({ email: email, id: user_id, image: image }, process.env.TOKEN_KEY, { expiresIn: '7d' });
}


exports.decodedToken = (token) => {
   try {
      return jwt.verify(token, process.env.TOKEN_KEY);
   } catch (error) {
      return null;
   }
}


