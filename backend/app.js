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

const Login = require('./routes/loginRouter');
const Facuet = require('./routes/sendEtherRouter')
const testRouter = require("./routes/test");
const contentsRouter = require("./routes/contentsRouter");


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








app.use('/ethFaucet',Facuet)
app.use('/contents',contentsRouter)
app.use("/users", Login);
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



app.post("/register", checkRegisterValidation, async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      await Users.create({
        userName: username,
        password: hash,
      });
      res.status(200).json({ message: "회원가입 성공" });
    } catch (e) {
      res.status(400).json({ message: "회원가입 실패" });
    }
  });
});

app.post("/login", async (req, res) => {
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
      .json({ message: "입력하신 Username은 존재하지 않습니다." });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({
      accessToken: null,
      message: "Username 또는 Password를 잘못입력하셨습니다.",
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



const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "INITIAL_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

app.post('/serveToken',async (req,res)=>{
  //글작성에 성공할시 발행한 ERC20토큰을 전달하는 메서드 .
  const receiveAccount = req.body.userId;


  const userInfo = await User.findAll({
    raw : true,
    where : {address:receiveAccount}
}) 

console.log(userInfo);

  // 현재 들어와 있는 지갑에서 다른 지갑으로 sj 코인을 보내봅시다. 
  // we
  // 배포된 erc20 코인과 관련되 메서드를 사용하기 위해서 contract객체를 생성하는 메서드 (abi, contract address)
  var myContract = new web3.eth.Contract(abi,"0x12Ed1f06ddAcfbBd5401508F053f7154c38E37F1");
    
  const result = await myContract.methods.transfer(userInfo[0].address,1000000000000000)
                 .send({from : '0x10E5fFd382244F3de89DE81A1CF340e60e53288D',gasPrice:100,gas:100000},
                async function(err,result){
                   try{
                     const balance = await myContract.methods.balanceOf(userInfo[0].address).call();
                    
                     
                   res.json(
                    {
                      message: "Serving Successed",
                      data: {
                        username: userInfo[0].userName,  // 사용자 이름
                        address: userInfo[0].address,  // 받는 계정의 주소
                        txHash: result,  // 트랜잭션 해시
                        tokenBalance: balance+"sj", // 유저의 토큰 잔액
                      }
                    }
                   )
                   }catch(err){
                     console.log(err);
                     res.status(502).json({message:"Error : signTransaction Failed"})
                   }
                 })

  
})

app.post('/serveToken1',async (req,res)=>{
  //글작성에 성공할시 발행한 ERC20토큰을 전달하는 메서드 .
   
  accounts = await web3.eth.accounts.wallet();
  console.log(accounts);
  
})
























