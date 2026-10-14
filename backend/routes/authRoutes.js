const express = require("express");

const {
  signup,
  signin,
  getMe,
  logout,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const {
  signupValidator,
  signinValidator,
} = require("../validators/authValidators");

const validate = require("../middleware/validationMiddleware");

const { authLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

// Authentication
router.post(
  "/signup",
  authLimiter,
  signupValidator,
  validate,
  signup
);

router.post(
  "/signin",
  authLimiter,
  signinValidator,
  validate,
  signin
);

// Protected authentication routes
router.get("/me", protect, getMe);

router.post("/logout", protect, logout);

module.exports = router;