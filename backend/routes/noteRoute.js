const express = require("express");
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");

const router = express.Router();

router.route("/notes").get(getAllNotes);
router.route("/note/new").post(createNote);
router.route("/note/:id").put(updateNote).delete(deleteNote);
module.exports = router;