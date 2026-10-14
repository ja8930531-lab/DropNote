const express = require("express");

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const {
  createNoteValidator,
  updateNoteValidator,
} = require("../validators/noteValidators");

const validate = require("../middleware/validationMiddleware");

const router = express.Router();

// Protect all note routes
router.use(protect);

// Create a note
router.post("/", createNoteValidator, validate, createNote);

// Get all active notes
router.get("/", getNotes);

// Get one note
router.get("/:id", getNote);

// Update a note
router.patch("/:id", updateNoteValidator, validate, updateNote);

// Delete a note
router.delete("/:id", deleteNote);

module.exports = router;