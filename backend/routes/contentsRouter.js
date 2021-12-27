const express = require('express');
const router = express.Router();
const db = require('../models');
const { Contents } = require('../models');

router.post('/', (req, res) => {
  //보내고 받는 형식 한번만 확인해주세요!
  let data = {
    userId: req.body.data.userId,
    title: req.body.data.title,
    content: req.body.data.content,
  };
  Contents.create({
    userId: data.userId,
    title: data.title,
    content: data.content,
  })
    .then((result) => {
      console.log('저장성공!');
      res.send('저장성공!');
    })
    .catch((err) => {
      console.log(err);
      res.send('content 저장 실패! ');
    });
});

module.exports = router;
