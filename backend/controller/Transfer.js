const { MEDIUMINT } = require('sequelize');
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const { erc20ABI } = require('../ABI');
const erc20Abi = erc20ABI();
var myContract = new web3.eth.Contract(
  erc20Abi,
  '0x12Ed1f06ddAcfbBd5401508F053f7154c38E37F1'
);

//tranfer함수를 제작해서 내보내는 컨트롤러
module.exports = {
  transfer: async (req, res) => {
    const receiveAccount = req.body.userId;
    const userInfo = await User.findAll({
      raw: true,
      where: { address: receiveAccount },
    });

    // 배포된 erc20 코인과 관련되 메서드를 사용하기 위해서 contract객체를 생성하는 메서드 (abi, contract address)
    const result = await myContract.methods
      .transfer(userInfo[0].address, 1000000000000000)
      .send(
        {
          from: '0x10E5fFd382244F3de89DE81A1CF340e60e53288D',
          gasPrice: 100,
          gas: 100000,
        },
        async function (err, result) {
          try {
            const balance = await myContract.methods
              .balanceOf(userInfo[0].address)
              .call();

            res.json({
              message: 'Serving Successed',
              data: {
                username: userInfo[0].userName, // 사용자 이름
                address: userInfo[0].address, // 받는 계정의 주소
                txHash: result, // 트랜잭션 해시
                tokenBalance: balance + 'sj', // 유저의 토큰 잔액
              },
            });
          } catch (err) {
            console.log(err);
            res.status(502).json({ message: 'Error : signTransaction Failed' });
          }
        }
      );
  },
  transfer1: async (req, res) => {
    const sendAccount = '0x5d73825FB9173bD1495c5669B028Caca0AAd1A5d';
    const privateKey =
      'e8f77fe9b7e742f83ea0b0c268ffb4e178e6668dabb1a7b8fc73d9327bc1fb0c';
    const receiveAccount = '0x747b089fD11Da5032242818E2728A6444CAe464f';

    //none를 구하는 함수  getTransactionCount

    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const data = myContract.methods
      .transfer(receiveAccount, 100000000000000)
      .encodeABI();

    const tx = {
      from: sendAccount,
      to: '0x12Ed1f06ddAcfbBd5401508F053f7154c38E37F1',
      nonce: nonce,
      gas: 500000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              const balance = await web3.eth.getBalance(receiveAccount);
              res.json({
                message: 'Transfer Successed',
                messsage: hash,
              });
            } else {
              console.log(err);
              console.log('실패!!');
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
        res.json({
          message: 'Transfer 실패',
        });
      });
  },
};
