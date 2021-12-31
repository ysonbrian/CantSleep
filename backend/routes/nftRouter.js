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
  nftPrice,
  setForSale,
  setApproveForAll,
  buyNft
} = require('../controller/Nft');



router.post('/',async(req, res, next) => {
  const { userId, name, description, imgURI, path, price } = req.body.data;
  const data = {
    userId: userId,
    name: name,
    description: description,
    imgURI: imgURI,
    path: path,
    price: price
    
  };

    setToken();
     setTimeout(() => {
    mintNFT(req, res, data);
     }, 600);
     setTimeout(() => {
      setApproveForAll();
     }, 1000);
     setTimeout(() => {
      setForSale(req,res,path,price)
     }, 1500);
});

router.post('/sendToken',(req,res)=>{
  const account = req.body.account
 sendToken(req,res,account)
});
router.post('/nftPrice',(req,res)=>{
  const tokenId = req.body.tokenId;
  nftPrice(req,res,tokenId)
});
router.post('/buyNft',(req,res)=>{
  const tokenId = req.body.tokenId;
  const buyer = req.body.buyer;
  const userId = req.body.userId
  buyNft(req,res,tokenId,buyer,userId)
})

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
 
 
  Metadata.findAll({
    where: {
      userId: req.body.data.username,
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
