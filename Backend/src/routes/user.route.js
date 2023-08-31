import Express from "express";
import {
  register,
  login,
  testMiddleware,
  logout,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/test", verifyToken, testMiddleware);
userRouter.delete("/logout", logout);

export default userRouter;
