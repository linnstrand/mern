const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// the only 2 unprotected routes are register amd login
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // using protect middleware to make sure only authorized users get this

module.exports = router;
