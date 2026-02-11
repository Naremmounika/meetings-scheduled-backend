const express = require("express");
const { addMeeting, editMeeting, getMeetingById, listAllMeetings, removeMeeting } = require("../interface");

const router = express.Router();

router.post("/", addMeeting);
router.get("/", listAllMeetings);
router.get("/:id", getMeetingById);
router.put("/:id", editMeeting);
router.delete("/:id", removeMeeting);

module.exports = router;
