const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.networkHost));
const { User, Contents } = require('../models');
const { sendToken,mintNFT,setToken,ownerOf,tokenUri} = require('../controller/Nft');

router.post('/', async(req, res, next) => {
  const { name, description, imgURI, path } = req.body.data;
  const data = {name : name,
                description : description,
                imgURI : imgURI,
                path : path  
  }
  setToken();
  setTimeout(async()=>{

    mintNFT(req,res,data)
    
  },1000)

 
});


router.get('/',sendToken);

router.get('/owner',(req,res)=>{
    ownerOf();
})
router.get('/tokenUri',(req,res)=>{
  tokenUri();
})

module.exports = router;
