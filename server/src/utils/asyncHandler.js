export default asynchandler = (execute_me) => {
  return (req, res, next) => {
    Promise.resolve(execute_me(req, res, next)).catch((error) => {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";
      res.status(statusCode).json({
        success: false,
        message: message,
      });
    });
  };
};
