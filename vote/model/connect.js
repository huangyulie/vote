const mongoose = require('mongoose');
mongoose.connect('mongodb://vote:hyl20030515@150.158.23.19:27017/vote')
    .then(()=>console.log("连接成功"))
    .catch(()=>console.log('连接失败'))
    

