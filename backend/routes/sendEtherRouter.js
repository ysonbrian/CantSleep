


const express = require('express');
const router  = express.Router();
const db = require('../models');
const lightwallet = require('eth-lightwallet')
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const { User, Users } = require("../models");



router.post('/',async(req,res)=>{
    
    const sendAccount = '0x10E5fFd382244F3de89DE81A1CF340e60e53288D';
    const receiveAccount = req.body.account
    const userInfo = await User.findAll({
        raw : true,
        where : {address:receiveAccount}
    }) 
   
    
    const privateKey = '46997d44f08d649590bbb145c196aff665cf18daac8bd61cc46297bfb9929d4b'

    //none를 구하는 함수  getTransactionCount

     const nonce = await web3.eth.getTransactionCount(sendAccount,'latest');

     const tx = {
        'from': sendAccount,
        'to': receiveAccount,
        'nonce': nonce,
        'gas': 500000,
        'value': web3.utils.toWei('0.01','ether')
      };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
 
  
    
  

    signPromise.then((signedTx) => {

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err, hash) {
          if (!err) {
            const balance  = await web3.eth.getBalance(receiveAccount)
            res.json(
                {
                    'message' : 'Facuet Successed',
                     'data' : {
                         'userName':userInfo[0].userName,
                         'address':userInfo[0].address,
                         'balance':web3.utils.fromWei(balance,'ether')+"eth",
                          'txHash':hash
                     }
                }
            );
          } else {
            console.log('실패!!')
          }
        });
      }).catch((err) => {
        console.log("Promise failed:", err);
        res.json(
            {
                message: "Error: Faucet Transaction Faield"
            }
        )
        
      });
})

module.exports = router;