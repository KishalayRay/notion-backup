const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          error: {
            message: "Token is not valid",
          },
        });
      } else {
        req.user = user;
        console.log(req.user);
        console.log(token, "token");
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: {
        message: "You are not authenticated",
      },
    });
  }
};
module.exports = verify;
