function isTeacher(req, res, next) {
  if (req.session.user && req.session.user.role === "teacher") {
    next();
  } else {
    res.status(403).send("Access denied: Teachers only");
  }
}

module.exports = isTeacher;
