const asyncWrapper = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // Catch errors by catch and forward to Express error handler
  };
};

module.exports = asyncWrapper;

/**
 ✅ What is next in Express?
In Express.js, next is a function that you call to:

👉 Move to the next middleware or route
👉 Or pass an error to the error-handling middleware
If something goes wrong, you call next(err):

app.get("/test", (req, res, next) => {
  const error = new Error("Something broke!");
  next(error); // Sends the error to the error handler
});

Express sees that next() got an error, so it jumps to this:
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

| When you call | What happens                        |
| ------------- | ----------------------------------- |
| `next()`      | Go to the next middleware/route     |
| `next(err)`   | Go to the error-handling middleware |

 */