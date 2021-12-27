const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const db = require('./models');
const lightwallet = require('eth-lightwallet');
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const { User, Users } = require('./models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkRegisterValidation } = require('./middlewares');

const Login = require('./routes/loginRouter');

const Facuet = require('./routes/sendEtherRouter')
const testRouter = require("./routes/test");
const contentsRouter = require("./routes/contentsRouter");
const serverTokenRouter = require("./routes/TransferRouter");
const infoRouter = require('./routes/infoRouter.js');


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

//app.use('/',Login);

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,





//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,








app.use('/ethFaucet',Facuet)
app.use('/contents',contentsRouter)
app.use("/users", Login);
app.use("/test", testRouter);
app.use("/serverToken", serverTokenRouter);


//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다.
// ex)findAll,

db.sequelize.sync().then(() => {
  app.listen(1234, (err, res) => {
    console.log('DB연결 성공 및 port구동중');
  });
});

app.post('/register', checkRegisterValidation, async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      await Users.create({
        userName: username,
        password: hash,
      });
      res.status(200).json({ message: '회원가입 성공' });
    } catch (e) {
      res.status(400).json({ message: '회원가입 실패' });
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await Users.findOne({
    where: {
      userName: username,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: '입력하신 Username은 존재하지 않습니다.' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({
      accessToken: null,
      message: 'Username 또는 Password를 잘못입력하셨습니다.',
    });
  }

  const token = jwt.sign({ username: user.userName }, SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).json({
    username: user.userName,
    accessToken: token,
    address: user.address,
  });
});


















