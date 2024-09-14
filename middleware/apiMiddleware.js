import { verify } from "jsonwebtoken";


const USER_ROLE = "admin"

export function withAdminAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Missing or invalid Authorization header" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verify(token, process.env.JWT_SECRET);

      if (decoded.role !== USER_ROLE) {
        return res
          .status(403)
          .json({ message: "Access denied. Admin privileges required." });
      }

      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Authentication failed" });
    }
  };
}
