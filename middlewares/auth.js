const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: "Must provide an authorization" });
    return;
  }
  // const token = authorization.replace("Bearer ", "");
  // jwt.verify(token, "sfdsf5sfs64s65f4sdfsdf", async (err, decoded) => {
  //   if (err) {
  //     res.status(401).send({ message: "Invalid token" });
  //     return;
  //   }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    req.user = decoded;
    next();
  });
}

exports.auth = auth;
