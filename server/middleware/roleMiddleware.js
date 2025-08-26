// server/middleware/roleMiddleware.js
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send("Accès interdit");
    }
    next();
  };
}

export default authorizeRoles;