const express = require('express');
const app = express();
const body = require('body-parser');
const index = require('./route/index');
const path = require('path');
const session = require('express-session');
require('./model/connect');

require('./model/user')

app.use(body.urlencoded({extended:false}));

app.use(session({
    secret:'seret',saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}));

//告诉express的位置
app.set('views',path.join(__dirname,'view'));
app.set('view engine','art');
app.engine('art',require('express-art-template'));

//开放静态
app.use(express.static(path.join(__dirname,'public')))

app.use('/index',index);


app.listen(30000,()=>{
    console.log('12323');
})