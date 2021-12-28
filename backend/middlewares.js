const { User, Users } = require("./models");
var jwt = require("jsonwebtoken");
const Web3 = require("web3");
const fs = require("fs");

let erc20Info = fs.readFileSync("./contracts/SimpleTestToken.json", {
  encoding: "utf8",
  flag: "r",
});
erc20Info = JSON.parse(erc20Info);

const checkRegisterValidation = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("checkRegisterValidation");
  console.log(username, password);
  const user = await User.findOne({
    where: {
      userName: username,
    },
  });
  if (user) {
    res
      .status(400)
      .json({ message: "회원가입 실패! 이미 등록된 Username입니다." });
    return;
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    // return res.status(403).json("message: 인증을 위한 토큰을 전송해주세요.");
    next();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // return res
        //   .status(401)
        //   .json({ message: "유효하지 않은 토큰입니다. 인증에 실패하였습니다." });
        next();
      } else {
        // console.log(decoded);
        // console.log(decoded);
        req.userName = decoded.username;
        req.userId = decoded.userId;
        req.userAddress = decoded.userAddress;
        // req.user = decoded;
        next();
      }
    });
  }
};

const mintErc20Token = async (to) => {
  // console.log(process.env.erc20CA);
  // console.log(process.env.nftCA);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.networkHost)
  );

  let erc20Contract = await new web3.eth.Contract(
    erc20Info.abi,
    process.env.erc20CA,
    {
      from: process.env.serverAddress,
    }
  );

  await erc20Contract.methods
    .mintToken(to, process.env.nftCA, await web3.utils.toWei("500"))
    .send({ gas: 100000 });

  // console.log(res);
};

module.exports = {
  checkRegisterValidation,
  verifyToken,
  mintErc20Token,
};
