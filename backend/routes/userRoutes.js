const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const passport = require("passport");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.send(req.user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

module.exports = router;
