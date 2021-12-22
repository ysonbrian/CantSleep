

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./models');
const { User } = require('./models')
const lightwallet = require('eth-lightwallet')
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

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


