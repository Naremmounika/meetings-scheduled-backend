const { createMeeting, updateMeeting, getMeeting, listMeetings, deleteMeeting } = require("../service");
const { validateMeeting } = require("../dto");

const addMeeting = async (req, res) => {
  try {
    validateMeeting(req.body);
    const meeting = await createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const editMeeting = async (req, res) => {
  try {
    validateMeeting(req.body);
    const meeting = await updateMeeting(req.params.id, req.body);
    res.status(200).json(meeting);
    res.send("meeting updated successfully")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const meeting = await getMeeting(req.params.id);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const listAllMeetings = async (req, res) => {
  try {
    const meetings = await listMeetings(req.query);
    res.status(200).json(meetings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeMeeting = async (req, res) => {
  try {
    await deleteMeeting(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { addMeeting, editMeeting, getMeetingById, listAllMeetings, removeMeeting };
