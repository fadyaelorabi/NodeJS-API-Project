const allowedTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.currentUser || !roles.includes(req.currentUser.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      next(error); // Forward any unexpected error to Express error handler
    }
  };
};

module.exports = allowedTo;
