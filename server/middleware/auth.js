export default function auth(req, res, next) {
  if (req.session.email == null || req.session.email.length == 0) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}
