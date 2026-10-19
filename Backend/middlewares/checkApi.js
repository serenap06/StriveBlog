const checkApi = (req, res, next) => {
  const { apikey } = req.query;
  if (apikey !== '1234') {
    return res.status(401).send({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  next();
};

module.exports = checkApi;
