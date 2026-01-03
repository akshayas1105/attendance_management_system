function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.send("Access denied: Admins only");
  }
}

module.exports = isAdmin;
