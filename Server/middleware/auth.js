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
