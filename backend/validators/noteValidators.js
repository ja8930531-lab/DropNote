const { body } = require("express-validator");

const createNoteValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required."),

  body("expiresAt")
    .notEmpty()
    .withMessage("Expiration time is required.")
    .isISO8601()
    .withMessage("Expiration time must be a valid date."),
];

const updateNoteValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty."),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Expiration time must be a valid date."),
];

module.exports = {
  createNoteValidator,
  updateNoteValidator,
};