const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const db = require("./models");
const lightwallet = require("eth-lightwallet");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const { User, Users } = require("./models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkRegisterValidation } = require("./middlewares");

const Login = require("./routes/login");
const testRouter = require("./routes/test");

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     store: new MySQLStore(options),
//   })
// );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", Login);
app.use("/test", testRouter);

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,

db.sequelize.sync().then(() => {
  app.listen(1234, (err, res) => {
    console.log("DB연결 성공 및 port구동중");
  });
});
