import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.TOKEN_KEY, {
    expiresIn: "24h",
  });
};

export const authenticateToken = (req, res, next) => {
  try {
    console.log("auth", req.headers.authorization);
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer azertyuiop
    console.log("token", token);

    if (!token) {
      throw new Error("token introuvable");
    }

    jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (error) {
    console.log(error);
  }
};
