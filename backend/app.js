

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./models');
const { User } = require('./models')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db테이블을 models안에서 생성한다. 그다음 그 객체를 require해와서 다양한 메서드를 사용한다. 
// ex)findAll, 


db.sequelize.sync()
.then(()=>{
    app.listen(1234,(err,res)=>{
        console.log('DB연결 성공 및 port구동중');
    })
})


app.get('/',(req,res)=>{
    res.send('1');
})




  