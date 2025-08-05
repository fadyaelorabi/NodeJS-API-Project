const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const httpsStatusText = require("./utils/httpsStatusText");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json()); //34n ast5dm body

app.use(cors());
app.use('/uploads',express.static(path.join(__dirname, "uploads")));//5ly folder da static just serve pics 34n ydwr gwah 3l a7gat static

const courseRouter = require("./routes/courses.route");
const userRouter = require("./routes/users.route");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);

//Handle unmatched routes -default route-
app.use((req, res) => {
  res.status(404).json({
    status: "ERROR",
    data: null,
    message: "Route not found",
  });
});

//global error handler law katba next(err)
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status:httpsStatusText.ERROR, message: error.message });
});

