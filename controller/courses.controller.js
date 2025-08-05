const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpsStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 2;
  const courses = await Course.find({}, { __v: 0 })
    .limit(limit)
    .skip((page - 1) * limit);
  //Model.find(filter bigger than 50 , projection a5tr el 3yz azhro, options)

  res.json({ status: httpStatusText.SUCCESS, data: courses });
});

const getCourse = asyncWrapper(async (req, res) => {
  console.log(req.params.courseId);

  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return res.json({
      status: httpStatusText.FAILED,
      data: { course: "not found" },
    });
  }

  return res.json({ status: httpStatusText.SUCCESS, data: course });
});

const createCourse = asyncWrapper(async (req, res) => {
  const course = new Course({
    title: req.body.title,
  });

  const result = await course.save();

  res.json({ status: httpStatusText.SUCCESS, data: result });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.courseId, // ID of the course to update
    req.body, // Fields to update (sent in the request body)
    { new: true, runValidators: true } // Return updated doc, validate inputs
  );

  if (!updatedCourse) {
    return res.json({
      status: httpStatusText.FAILED,
      data: { course: "not found" },
    });
  }
  res.json({ status: httpStatusText.SUCCESS, data: updatedCourse });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  await Course.findByIdAndDelete(req.params.courseId);
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
