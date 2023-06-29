import jwt from 'jsonwebtoken';

// middleware funtion to verify and validate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) res.status(403).send(`Token not Valid!`);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send(`You are not authenticated`);
  }
};

// middleware funtion to verify, validate token, and authorize user/admin requests
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req.user.id = req.param.id || req.user.isAdmin)) {
      next();
    } else {
      res.status(403).send(`Not Allowed!`);
    }
  });
};
// middleware funtion to verify, validate token, and authorize  only admin requests
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send(`Not Allowed! You're not an Admin!`);
    }
  });
};

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization };
