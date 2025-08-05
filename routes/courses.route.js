const express = require("express");
const router = express.Router();
const courseController = require("../controller/courses.controller");
const validationSchema = require("../middleware/validationSchema");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../enums/userRoles");
const allowedTo = require("../middleware/allowedTo.js");

// Base route: /courses

// Handle GET and POST at /courses
router
  .route("/")
  .get(courseController.getAllCourses)
  .post(verifyToken,validationSchema, courseController.createCourse);

// Handle GET, PATCH, DELETE at /courses/:courseId
router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), courseController.deleteCourse);

module.exports = router;
