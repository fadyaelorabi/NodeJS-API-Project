const User = require("../models/user.model");
const httpStatusText = require("../utils/httpsStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT");

const getallUsers = asyncWrapper(async (req, res) => {
  console.log(req.headers);
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 2;
  const users = await User.find({}, { __v: 0, password: 0 })
    .limit(limit)
    .skip((page - 1) * limit);

  res.json({ status: httpStatusText.SUCCESS, data: users });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "User already exists" },
    });
  }
  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file ? req.file.path : null, // ✅ Save avatar file path
  });

  //JWT token
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  console.log(token);

  newUser.token = token;
  await newUser.save(); // <-- needed Mongoose doesn't auto-save when you modify a document after create()

  res.json({ status: httpStatusText.SUCCESS, data: newUser });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "Please provide email and password" },
    });
  }
  const user = await User.findOne({ email });
  console.log(user);

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (matchedPassword && user) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    console.log(token);
    res.json({ status: httpStatusText.SUCCESS, data: { user } });
  } else {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "Invalid email or password" },
    });
  }
});

module.exports = { getallUsers, register, login };
