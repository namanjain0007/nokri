const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token)
//     return res.status(401).json({ msg: "Access denied, no token provided" });

//   try {
//     const verified = jwt.verify(token, "yourSecretKey123");
//     console.log("verified", verified);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(403).json({ msg: "Invalid or expired token" });
//   }
// };
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ msg: "No token provided!" });
  }

  jwt.verify(token, "yourSecretKey123", (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Token has expired or is invalid!" });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(403).json({ msg: "Token has expired!" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
