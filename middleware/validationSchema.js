// routes/validationSchema.js
const Joi = require("joi");
const httpStatusText = require("../utils/httpsStatusText");

const courseSchema = Joi.object({
  title: Joi.string().min(3).required(),
});

function validationSchema(req, res, next) {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({
        status: httpStatusText.FAILED,
        message: error.details[0].message,
      });
  }
  next();
}

module.exports = validationSchema;
