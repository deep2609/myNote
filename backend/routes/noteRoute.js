const express = require("express");
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/notes").get(isAuthenticatedUser, getAllNotes);
router.route("/note/new").post(isAuthenticatedUser,createNote);
router.route("/note/:id").put(isAuthenticatedUser,updateNote).delete(isAuthenticatedUser,deleteNote);
module.exports = router;