const express = require('express');
const {
  getData,
  setData,
  updateData,
  deleteData,
} = require('../controllers/dataController');
const router = express.Router();

router.get('/', getData).post('/', setData);

router.put('/:id', updateData).delete('/:id', deleteData);

module.exports = router;
