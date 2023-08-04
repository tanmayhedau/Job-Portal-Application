import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth failed");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("auth failed");
  }
};
