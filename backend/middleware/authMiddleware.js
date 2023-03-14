const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// middleware use next to move to next middleware
// We must later remember to put the bearer token in the header!
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  // Token should start with Bearer
  if (auth && auth.startsWith('Bearer')) {
    try {
      // Token is the second part, after "bearer"
      token = auth.split(' ')[1];

      // Verify token and get the payload. We use id to sign so we have id on the object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user but exclude password with "-"
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
