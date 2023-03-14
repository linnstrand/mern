const asyncHandler = require('express-async-handler');

const Data = require('../models/dataModel');

const getData = asyncHandler(async (req, res) => {
  const data = await Data.find();
  res.status(200).json(data);
});

const setData = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const data = await Data.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(data);
});

const updateData = asyncHandler(async (req, res) => {
  const data = await Data.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error('Data not found');
  }
  const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedData);
});

const deleteData = asyncHandler(async (req, res) => {
  const data = await Data.findByIdAndRemove(req.params.id);
  if (!data) {
    res.status(400);
    throw new Error('Data not found');
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = { getData, setData, updateData, deleteData };
