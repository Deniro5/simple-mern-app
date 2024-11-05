const jwt = require("jsonwebtoken");

const generateTokenAndAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // XSS prevention
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //csrf
    maxAge: 7 * 24 * 3600 * 1000,
  });
};

module.exports = generateTokenAndAndSetCookie;
