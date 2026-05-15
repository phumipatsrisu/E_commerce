const jwt = require("jsonwebtoken");

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, "mySecretKey123");
    console.log(decoded);

    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token Invalid" });
  }
};

exports.admidCheck = async (req, res, next) => {
  try {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({ msg: "Only Admin" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ไม่มีสิทธิ์เข้าถึง" });
  }
};
