const jwt = require("jsonwebtoken");

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Don't have key can not sign in" });
    }

    const decoded = jwt.verify(token, "mySecretKey123");

    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "บัตรผ่านปลอม หรือหมดอายุแล้ว!" });
  }
};
