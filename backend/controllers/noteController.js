const mongoose = require("mongoose");
const Note = require("../models/Note");

// Create a note
const createNote = async (req, res) => {
  try {
    const { title, content, expiresAt } = req.body;

    // Check required fields
    if (!title || !content || !expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and expiration time are required.",
      });
    }

    // Make sure the expiration date is valid
    const expirationDate = new Date(expiresAt);

    if (Number.isNaN(expirationDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid expiration date.",
      });
    }

    // Make sure the note expires in the future
    if (expirationDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Expiration time must be in the future.",
      });
    }

    const note = await Note.create({
      user: req.userId,
      title,
      content,
      expiresAt: expirationDate,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      note,
    });
  } catch (error) {
    console.error("Create note error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the note.",
    });
  }
};

// Get all active notes for the logged-in user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.userId,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Get notes error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching notes.",
    });
  }
};

// Get one active note
const getNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId,
      expiresAt: { $gt: new Date() },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or has expired.",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("Get note error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the note.",
    });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
    });
    }
    const { title, content, expiresAt } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId,
      expiresAt: { $gt: new Date() },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or has expired.",
      });
    }

    if (title !== undefined) {
      note.title = title;
    }

    if (content !== undefined) {
      note.content = content;
    }

    if (expiresAt !== undefined) {
      const expirationDate = new Date(expiresAt);

      if (Number.isNaN(expirationDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiration date.",
        });
      }

      if (expirationDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Expiration time must be in the future.",
        });
      }

      // Reset reminder tracking only when the expiration changes
      if (expirationDate.getTime() !== note.expiresAt.getTime()) {
        note.expirationReminderSentAt = null;
      }

      note.expiresAt = expirationDate;
    }

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note,
    });
  } catch (error) {
    console.error("Update note error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the note.",
    });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid note ID.",
        });
        }
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error("Delete note error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the note.",
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};