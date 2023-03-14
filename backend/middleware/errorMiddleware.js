const errorHandler = (err, req, res, next) => {
  console.log(req);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode === 200 ? 400 : statusCode);
  res.json({
    message: err.message + `I am ${res.statusCode}`,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
