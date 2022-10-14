const express = require("express");
const { body } = require("express-validator");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  userRegister,
  registerActivate,
  userLogin,
  getUserData,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} = require("../../controllers/configControllers/authController");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post(
  "/register",
  body("username").not().isEmpty().withMessage("Username required"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  apiLimiter,
  userRegister
);

router.post("/register/activate", registerActivate);
router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").not().isEmpty().withMessage("Enter Password"),
  userLogin
);
router.get("/user", verify, getUserData);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
module.exports = router;
