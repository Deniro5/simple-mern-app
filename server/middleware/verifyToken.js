const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "no token " });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) res.status(401).json({ message: "no token " });

    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { verifyToken };
