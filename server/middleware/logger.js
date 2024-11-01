const logger = (req, res, next) => {
  console.log(req.body + " " + req.method);
  next();
};

module.exports = logger;
