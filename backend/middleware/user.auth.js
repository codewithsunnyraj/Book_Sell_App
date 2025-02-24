import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  //   console.log("authheader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(404).json({ errors: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("access token value", token);
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Invalid token or expired token",
      success: false,
      errors: error,
    });
  }
}

export default userMiddleware;
