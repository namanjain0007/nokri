const express = require("express");
const server = express();
// const multer = require("multer");

const cors = require("cors");
// const session = require("express-session"); // session import

const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const jobApplicationRouter = require("./router/job_application-router");

server.use(
  cors({
    origin: "https://nokri-frontend.onrender.com", // Frontend's URL
    credentials: true, //  allowed Cookies
  })
);

// server.use(
//   session({
//     secret: "yourSecretKey123",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true, // Security ke liye httpOnly
//     },
//   })
// );
// server.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })

const PORT = 5012;

server.use(express.json());

server.use("/", router);
server.use("/contactForm", contactRoute);
server.use("/", jobApplicationRouter);

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`server started at PORT : ${PORT}`);
  });
});
