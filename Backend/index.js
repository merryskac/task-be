import Express from "express";
import taskRouter from "./src/routes/task.route.js";
import userRouter from "./src/routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import multer from "multer";

dotenv.config();
const app = Express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'images')
  },
  filename: (req, file, cb)=>{
    cb(null, new Date().getTime()+ '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true);
  }else{
    cb(null, false)
  }
}

app.use(Express.json());

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('profile_img'))

app.use(cors(
  { 
    credentials: true, 
    origin: "http://localhost:5000",
  }
  ));
app.set("trust proxy", 1)
app.use(cookieParser());
app.use(
  session({
    resave: true,
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

app.listen(5000, () => {
  console.log("connected to server");
});

