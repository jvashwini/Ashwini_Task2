
import express from "express";
import { authMiddleware } from "../middleware/authmiddle.js";
import { notes } from "../data.js";

const router = express.Router();

// ✅ Get all notes for logged-in user
router.get("/", authMiddleware, (req, res) => {
  const userNotes = notes.filter((n) => n.userId === req.user.id);
  res.json(userNotes);
});

// ✅ Add a new note
router.post("/", authMiddleware, (req, res) => {
  const { name, topic, text } = req.body;
  if (!name || !topic || !text) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const newNote = {
    id: notes.length + 1,
    userId: req.user.id,
    name,
    topic,
    text,
  };
  notes.push(newNote);
  res.status(201).json({ msg: "Note added successfully", note: newNote });
});

// ✅ Delete a note by ID
router.delete("/:id", authMiddleware, (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(
    (n) => n.id === noteId && n.userId === req.user.id
  );

  if (noteIndex === -1) {
    return res.status(404).json({ msg: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  console.log("Deleted Note ID:", noteId);
  res.json({ msg: "Note deleted successfully" });
});


export default router;

