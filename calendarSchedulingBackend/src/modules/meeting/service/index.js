const { Op } = require("sequelize");
const Meeting = require("../model");

const hasConflict = async ({ userId, startTime, endTime, excludeId }) => {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
};

const createMeeting = async (data) => {
  const conflict = await hasConflict(data);
  if (conflict) throw new Error("Time slot already booked");

  return Meeting.create(data);
};

const updateMeeting = async (id, data) => {
  const conflict = await hasConflict({ ...data, excludeId: id });
  if (conflict) throw new Error("Time slot already booked");

  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error("Meeting not found");

  return meeting.update(data);
};

const getMeeting = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error("Meeting not found");
  return meeting;
};

const listMeetings = async (filters = {}) => {
  const where = {};
  if (filters.userId) where.userId = filters.userId;
  if (filters.startDate && filters.endDate) {
    where.startTime = { [Op.gte]: filters.startDate };
    where.endTime = { [Op.lte]: filters.endDate };
  }
  return Meeting.findAll({ where });
};

const deleteMeeting = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error("Meeting not found");
  return meeting.destroy();
};

module.exports = { createMeeting, updateMeeting, getMeeting, listMeetings, deleteMeeting };
