import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // const token = window.localStorage.getItem('token')

  if (!token) res.status(401).json({ message: "Token is Empty" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    console.log(err);
    if (err) return res.status(403).json({ message: err });
    req.id = decoded.id
    console.log("Verifikasi Token Berhasil");
    next();
  });
};

export default verifyToken;
