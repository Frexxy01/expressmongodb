const { constants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  const errorResponse = {
    message: err.message,
    stack: err.stack
  };

  switch (statusCode) {
    case 400: // Bad Request
      res.json({
        title: "Bad Request",
        ...errorResponse
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        ...errorResponse
      });
      break;
    case constants.VALIDATION_FAILED:
      res.json({
        title: "Validation Failed",
        ...errorResponse
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        ...errorResponse
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        ...errorResponse
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        ...errorResponse
      });
      break;
    default:
      res.json({
        title: "Error",
        ...errorResponse
      });
      break;
  }
};

module.exports = errorHandler;
