const getData = (req, res) => {
  res.status(200).json({ message: 'Get data' });
};

module.exports = { getData };
