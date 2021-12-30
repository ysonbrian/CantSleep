const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { checkRegisterValidation } = require('../middlewares');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const bcrypt = require('bcrypt');
const { User } = require('../models');
var jwt = require('jsonwebtoken');

const SECRET = 'BEB-01-PROJECT-02';
const saltRounds = 10;

router.post('/register', checkRegisterValidation, async (req, res) => {
  const { username, password } = req.body;
  console.log('register');
  const account = await web3.eth.accounts.create();
  console.log(account);
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      await User.create({
        userName: username,
        password: hash,
        privateKey: account.privateKey,
        address: account.address,
      });
      res.status(200).json({ message: '회원가입 성공' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: '회원가입 실패' });
    }
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({
    where: {
      userName: username,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: '입력하신 Username은 존재하지 않습니다.' });
  }
  console.log(user);

  const passwordIsValid =
    bcrypt.compareSync(password, user.password) || password === user.password;
  // passwordIsValid = password === user.password;
  console.log(passwordIsValid);
  if (!passwordIsValid) {
    return res.status(401).json({
      accessToken: null,
      message: 'Username 또는 Password를 잘못입력하셨습니다.',
    });
  }

  const token = jwt.sign({ username: user.userName }, 'BEB-01-PROJECT-02', {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).json({
    username: user.userName,
    accessToken: token,
    address: user.address,
  });
});

router.get('/', async () => {
  // console.log(web3);
  const account = await web3.eth.accounts.privateKeyToAccount(
    'b6c5a2eeaed1f8b2f8967582ec8846fdefe589cc293d7526d3fe9cf9f423a013'
  );
  console.log(account);
});

router.get('/faucet', async (req, res) => {
  const { userName } = req.body;
  try {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    console.log(user);

    let tx = {
      to: user.address,
      value: web3.utils.toWei('1'),
    };
    tx['gas'] = await web3.eth.estimateGas(tx);
    console.log(tx);

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    console.log(signedTx);

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on('receipt', console.log);

    res.status(200).json({ message: 'faucet 성공' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'faucet 에러' });
  }
});

module.exports = router;
