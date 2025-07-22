const jwt = require ('jsonwebtoken');
require('dotenv').config();


//generate a signed JWT for authentication
const generateToken = (user) => {
  return jwt.sign (
    {id: user.id, role: user.role}, //info saved in token
    process.env.JWT_SECRET, //secret key from .env
    {expiresIn: '1h'} //token validity
  );
};


module.exports = generateToken;