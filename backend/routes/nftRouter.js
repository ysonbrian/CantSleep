const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.networkHost));
const { User, Contents, Metadata } = require('../models');
const {
  sendToken,
  mintNFT,
  setToken,
  ownerOf,
  tokenUri,
} = require('../controller/Nft');

router.post('/', async (req, res, next) => {
  const { userName, name, description, imgURI, path, price } = req.body.data;
  console.log('hahahahahahha', req);
  const data = {
    userId: userName,
    name: name,
    description: description,
    imgURI: imgURI,
    path: path,
    price: price,
  };
  setToken();
  setTimeout(async () => {
    mintNFT(req, res, data);
  }, 1000);
});

router.get('/', sendToken);

router.get('/owner', (req, res) => {
  ownerOf();
});
router.get('/tokenUri', (req, res) => {
  tokenUri();
});

router.get('/explore', (req, res, next) => {
  Metadata.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/mypage', (req, res, next) => {
  console.log(req);
  Metadata.findAll({
    where: {
      userId: req.userName,
    },
  })
    .then((data) => {
      if (data !== []) return res.json(data);
      else return res.json(null);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
