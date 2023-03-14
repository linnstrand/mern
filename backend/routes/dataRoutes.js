const express = require('express');
const {
  getData,
  setData,
  updateData,
  deleteData,
} = require('../controllers/dataController');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getData).post('/', protect, setData);
router.put('/:id', protect, updateData).delete('/:id', protect, deleteData);

module.exports = router;
