const {validateToken}= require("../util/createToken");

function requireAuth(req, res, next) {
  try {
    let token;

    // Option 1: Read from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")){
      token=authHeader.split(" ")[1];
    }

    // Option 2: (later) Read from cookie: req.cookies.token
    if(!token && req.cookies && req.cookies.token){
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please sign in.",
      });
    }

    // Validate token and get payload (id, name, email)
    const payload = validateToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Attach user info to the request
    req.user = payload;

    next();
  } catch (error) {
    console.error("Error in requireAuth middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
}
module.exports= requireAuth;