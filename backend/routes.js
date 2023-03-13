const express = require('express');
const { getData } = require('./controllers');
const router = express.Router();

router.get('/', getData);

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Set goal' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Change goal ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete goas ${req.params.id}` });
});

module.exports = router;
