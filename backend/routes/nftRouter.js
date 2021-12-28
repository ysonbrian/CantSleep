const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const { User, Contents } = require('../models');

router.post('/', (req, res, next) => {
  console.log(req);
});

module.exports = router;
