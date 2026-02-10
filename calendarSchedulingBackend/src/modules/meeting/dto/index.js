const Joi = require("joi");

const meetingSchema = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
});

const validateMeeting = (data) => {
  const { error } = meetingSchema.validate(data);
  if (error) throw new Error(error.details[0].message);

  if (new Date(data.startTime) >= new Date(data.endTime)) {
    throw new Error("startTime must be before endTime");
  }
};

module.exports = { validateMeeting };
