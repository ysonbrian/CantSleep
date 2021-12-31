const { MEDIUMINT } = require('sequelize');
const Web3 = require('web3');
const web3 = new Web3(process.env.networkHost);
const db = require('../models');
const { Metadata } = require('../models');
const { erc20ABI, erc721ABI } = require('../ABI');
const erc20Abi = erc20ABI();
const erc721Abi = erc721ABI();
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

//erc20 토큰을 받아서 일단 받아서 nft발행을 시키자 .
// 1. 토큰을 발행 하면서 nft컨트랙주소를 등록해 줍시다.
module.exports = {
  sendToken: async (req, res,account) => {
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const receiveAccount = account

    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const data = erc20Contract.methods
      .mintToken(receiveAccount, process.env.nftCA, web3.utils.toWei('200'))
      .encodeABI();
    const tx = {
      from: sendAccount,
      to: process.env.erc20CA,
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
              res.json({
                message: 'mintToken Successed',
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
  mintNFT: async (req,res,metadata) => {

   
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const tokenUri = `https://ipfs.io/ipfs/${metadata.path}`;
    const receiveAccount = '0x747b089fD11Da5032242818E2728A6444CAe464f';
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const data = erc721Contract.methods
      .mintNFT(receiveAccount, tokenUri)
      .encodeABI();
      
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    let outTokenId = 0;

    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              
              const tokenId = await erc721Contract.methods
                .checkTokenId(tokenUri)
                .call();

                console.log(tokenId+"mint");
                
               
              Metadata.create({
                userId: metadata.userId,
                name: metadata.name,
                description: metadata.description,
                imgURI: metadata.imgURI,
                tokenURI: tokenUri,
                tokenId: tokenId,
                price : metadata.price
              }).then((result) => {
               
              
                console.log('DB store success!');
               
              });
              
            } else {
              console.log('failed!');
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
       
      });
     
  },
  setToken: async () => {
    //erc20 CA를  nftCA에서 사용할 수 있도록 연결하는 부분, 즉 민팅전에 먼저 이부분이 실행되어야합니다.

    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;

    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const data = erc721Contract.methods
      .setToken(process.env.erc20CA)
      .encodeABI();
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              console.log('setToken function successed');
            } else {
              console.log(err);
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  },

  ownerOf: async (tokenId) => {
    const owner = await erc721Contract.methods.ownerOf('2').call();
    console.log(owner);
  },
  tokenUri: async (tokenId) => {
    const tokenUri = await erc721Contract.methods.tokenURI('3').call();
    console.log(tokenUri);

    const tokenId1 = await erc721Contract.methods.checkTokenId(tokenUri).call();
    console.log(tokenId1);
  },
  
  setForSale : async (req,res,path,price)=>{
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const tokenUri = `https://ipfs.io/ipfs/${path}`;
    console.log(tokenUri);
    const tokenId = await erc721Contract.methods.checkTokenId(tokenUri).call();   
    console.log(tokenId+"setfor");
               
    const data = await erc721Contract.methods.setForSale(tokenId,web3.utils.toWei(price,'ether')).encodeABI();
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');

    
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };
    console.log(price);

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              res.send('successed!')
              console.log('setforSale function successed');
            } else {
              console.log(err);
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  },
  nftPrice :async (req,res,tokenId)=>{
  const tokenPrice =  await erc721Contract.methods.tokenPrice(tokenId).call();
  console.log(tokenPrice);
  },
  setApproveForAll : async()=>{
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    data = await erc721Contract.methods.setApprovalForAll(process.env.nftCA,true).encodeABI();
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');

    
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              console.log('setApproveForAll function successed');
            } else {
              console.log(err);
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  },

  buyNft : async(req,res,tokenId,buyer,userId)=>{
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    data = await erc721Contract.methods.purchaseToken(tokenId,buyer).encodeABI();
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');

    
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              Metadata.update({
                userId: userId
              },{where :  {tokenId : tokenId}})
              .then((result) => {
                console.log('success buy nft');
              });
              
              
            } else {
              console.log(err);
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  }
};
