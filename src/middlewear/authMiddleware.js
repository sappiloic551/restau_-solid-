const jwt = require ('jsonwebtoken');
require ('dotenv').config();

//Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) return res.status(403).json({message:'Access token required.'});

  try {
    const decoded = jwt.verifyToken(token.split (' ')[1], process.env.JWT_SECRET);
    req.user = decoded; //Add user infoto request
    next();// continue to route
  } catch (err){
    return res.status(401).json({message:'Invalid access token'});
  }
};

//Middleware to restrict access to admin role
const isAdmin = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.status(403).json ({message: 'Admin access only'});
  }
  next();
};

module.exports = {verifyToken, isAdmin};