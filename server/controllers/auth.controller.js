const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateTokenAndAndSetCookie = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require("../mailtrap/emails");
const { verify } = require("crypto");

const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = {
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 3600 * 1000, // 24 hours
    };

    const createdUser = await User.create(user);

    //jwt
    generateTokenAndAndSetCookie(res, createdUser._id);

    //-> this doesnt work sometimes because of some auth issue with mailtrap
    await sendVerificationEmail(createdUser.email, verificationToken);

    res.status(201).json({
      message: "user create successfully",
      user: {
        ...createdUser._doc,
        password: undefined,
      },
    });
  } catch (e) {
    res.status(500);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    generateTokenAndAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    user.save();

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "server errror",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token"); //clear token set by generateTokenAndSetCookie
  res.status(200).json({ message: "Logout success" });
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.body.verificationToken,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ message: "invalid verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.save();

    //-> this doesnt work because of some auth issue with mailtrap
    //await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({ message: "User verified" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const resetPasswordToken = crypto.randomBytes(20).toString("hex");

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpiresAt = Date.now() + 1 * 3600 * 1000; //1 hours
      await user.save();

      await sendPasswordResetEmail(
        email,
        `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
      );
    }
    res.status(200).json({
      message:
        "If an account with this email exists, a password reset email has been sent",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "invalid or expired token" });
    //then return the user to the client?

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    sendResetSuccessEmail(user.email);

    res.status(200).json({
      message: "Password reset successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const checkAuth = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId);

    if (!user) return res.status(400).json({ message: "user not found" });

    res.status(200).json({
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
