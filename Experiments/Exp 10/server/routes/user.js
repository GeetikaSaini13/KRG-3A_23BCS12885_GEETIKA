const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// Signup routes
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username must be at least 5 characters long" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    // Check user Exists
    const userExistsEmail = await User.findOne({ email: email });
    const userExistsUsername = await User.findOne({ username: username });
    if (userExistsEmail || userExistsUsername) {
      return res
        .status(400)
        .json({ error: "User already exists, Please Login." });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// Login routes
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //  Check user Exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //  Generate token
    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.cookie("podtubeUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 100, // 30 days
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    });
    return res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// Logout routes
router.post("/logout", async (req, res) => {
  if (req.cookies.podtubeUserToken) {
    res.clearCookie("podtubeUserToken", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout successful" });
  }
});

// Check cookies
router.get("/check-cookies", async (req, res) => {
  const token = req.cookies.podtubeUserToken;
  if (token) {
    return res.status(200).json({ message: true });
  } else {
    return res.status(200).json({ message: false });
  }
});

// Route Fetch User Details
router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await User.findOne({ email: email }).select(
      "-password"
    );
    return res.status(200).json({ user: existingUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// Route Get User Details
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      profileImage: user.profileImage || "https://via.placeholder.com/150",
      name: user.username,
      email: user.email,
      totalViews: user.totalViews || 0,
      totalLikes: user.totalLikes || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;
