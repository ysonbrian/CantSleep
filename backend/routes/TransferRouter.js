
const express = require('express');
const router  = express.Router();
const db = require('../models');
const lightwallet = require('eth-lightwallet')
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const { User, Users } = require("../models");



const { transfer,transfer1 } = require('../controller/Transfer');

// trnafer함수만 사용해서 진행하는 경우!! 
router.post('/serverToken',transfer)


//ex2) 이부분은 위와달리 TX를 생성해서 Tx data에  transfer함수를 사용해서 보내는 부분입니다. 
// 지금 이부분이 테스트 성공중 
router.post('/',transfer1)

module.exports = router;








