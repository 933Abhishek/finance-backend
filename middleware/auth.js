module.exports = function(requiredRole) {
  return (req, res, next) => {
    const role = req.headers.role;

    if (!role) {
      return res.status(401).json({ message: "Role header missing" });
    }

    const roles = ["viewer", "analyst", "admin"];

    if (!roles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Permission logic
    if (requiredRole === "admin" && role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    if (requiredRole === "analyst" && role === "viewer") {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};