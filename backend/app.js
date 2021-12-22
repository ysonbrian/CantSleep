const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const db = require('./models');
const lightwallet = require('eth-lightwallet')
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

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

web3.eth
    .getAccounts()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        throw err;
    });

db.sequelize.sync()
.then(()=>{
    app.listen(1234,(err,res)=>{
        console.log('DB연결 성공 및 port구동중');
    })
})




app.post('/user', async(req,res) => {
    // 포스트맨에서 userName, password를 넣으면
    let reqUserName, reqPassword;
    reqUserName = req.body.userName;
    reqPassword = req.body.password;
  
    // user에서 find로 userName을 찾고,
    User.findOrCreate({
      where: {
        'userName': reqUserName
      },
      default: {
       'password': reqPassword
      }
    })
    .then(([user, created]) => {
      if (!created) {
        // 있으면 있다고 응답
        res.status(409).send("User exists");
      // 없으면 DB에 저장
      } else {
        // 니모닉코드 생성  
        let mnemonic;
        mnemonic = lightwallet.keystore.generateRandomSeed();
        // 생성된 니모닉코드와 password로 keyStore, address 생성
        lightwallet.keystore.createVault({
          password: reqPassword, 
          seedPhrase: mnemonic,
          hdPathString: "m/0'/0'/0'"
        },
        function (err, ks) {
          ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
            ks.generateNewAddress(pwDerivedKey, 1);
            
            let address = (ks.getAddresses()).toString();
            let keyStore = ks.serialize();
  
            User.update({
              password: reqPassword,
              address: address,
              privateKey: mnemonic
            }, {
              where: {
                userName: reqUserName
              }
            })
            .then(result => {
              // 주소를 보여준다
              res.json(address);
            })
            .catch(err => {
              console.error(err);
            })
          });
        });
      }
    })
  });


app.get('/',(req,res)=>{
    res.send('1');
})



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
})
