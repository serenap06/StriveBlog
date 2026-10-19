const logger = (req, res, next) => {
  const { method, url, host } = req;
  console.log(`A request with method ${method} to url ${url} by host ${host}`);
  next();
};

module.exports = logger;
