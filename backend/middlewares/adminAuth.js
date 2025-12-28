import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Extract token from either 'token' header or 'Authorization' header
    let token = req.headers.token;
    
    // If not in 'token' header, check 'Authorization' header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      // Extract token from "Bearer <token>" format
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      } else {
        token = authHeader;
      }
    }

    console.log("Received Token:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded Token:", tokenDecode);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
