const express = require("express");
const { addMeeting, editMeeting, getMeetingById, listAllMeetings, removeMeeting } = require("../interface");

const router = express.Router();

router.post("/meetings", addMeeting);
router.get("/meetings", listAllMeetings);
router.get("/meetings/:id", getMeetingById);
router.put("/meetings/:id", editMeeting);
router.delete("/meetings/:id", removeMeeting);

module.exports = router;
