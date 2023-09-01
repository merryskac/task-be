import Express from "express";
import taskRouter from "./src/routes/task.route.js";
import userRouter from "./src/routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();
const app = Express();
app.use(Express.json());

app.use(cors(
  { 
    credentials: true, 
    origin: ["http://localhost", "vercel.app"],
  }
  ));
app.set("trust proxy", 1)
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUnitialized: false,
    secret: "session",
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false
    }
  })
)
app.use(taskRouter);
app.use(userRouter);

app.listen(4000, () => {
  console.log("connected to server");
});

