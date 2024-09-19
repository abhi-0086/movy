// const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res, next) => {
//   //get token from header
//   const token = req.header("Authorization");
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }
//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     req.user = decoded; // Attach the user info from the token's payload
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Ensure the token starts with "Bearer " and extract the token part
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token not found or improperly formatted" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Log the decoded payload

    req.user = decoded; // Attach the user info from the token's payload
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
