const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const db = require("./models");
const { User, Users } = require("./models");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const saltRounds = 10;

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(options),
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,

db.sequelize.sync().then(() => {
  app.listen(1234, (err, res) => {
    console.log("DB연결 성공 및 port구동중");
  });
});

app.get("/", (req, res) => {
  res.send("1");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      await Users.create({
        userName: username,
        password: hash,
      });
      res.json({ message: "회원가입 성공" });
    } catch (e) {
      res.json({ message: "회원가입 실패" });
    }
  });
});
