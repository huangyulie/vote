const express = require('express');

const bcrypt = require('bcryptjs');

const { User,Stu } = require('../model/user');

const index = express.Router();

index.get('/login',(req,res)=>{
    res.render('index/login');
})

index.post('/login',async (req,res)=>{

    // res.send(req.body);
    const {user,password} = req.body;
    if(user.trim().length == 0 || password.trim().length == 0){
        return res.send('请输入用户名或者密码 <script>setTimeout(function(){window.history.back(-1)},3000)</script>' );
    }

    let users = await User.findOne({username:user});
    // console.log(users.username);

    if(users){
        let isValid = await bcrypt.compare(password,users.password);
        if(isValid){
            req.session.username = users.username;
            req.app.locals.userInfo = users;
            res.redirect('/index/index');
        }else{
            res.send(`<script>
            alert('用户名或密码错误') 
            setTimeout(()=>{
                window.history.back(-1)
            },300)
            </script>`);
        }
    }else{
        res.send(`<script>
        alert('用户名或密码错误') 
        setTimeout(()=>{
            window.history.back(-1)
        },300)
        </script>`);
    }

});

index.get('/register',(req,res)=>{
    res.render('index/register');
})
index.get('/index',require('./index/index'))

index.get('/logout',(req,res)=>{
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.redirect('/index/login')
    });

})

index.post('/register',require('./index/register'))

index.get('/ote',async (req,res)=>{
    let id = req.query.id;
    let users = await Stu.find({_id:id});

    let stus;

    if(req.session.username !== undefined){
        stus = await User.find({username:req.session.username});
    }else{
        stus = [{data:1}];
    }

    if(stus[0].data > 0){
        res.redirect('/index/index')
    }else{
        await Stu.updateOne({_id:id},{
            vote:users[0].vote+1,
        })
        await User.updateOne({username:req.session.username},{
            data:stus[0].data+1
        })
        res.redirect('/index/index')
    }
})
index.get('/yzm',require('./index/yzm'));

index.get('/parter',require('./index/parter'));
//暴露
index.get('/rank',require('./index/rank'));
index.get('/talk',require('./index/talk'));
index.post('/comment',require('./index/comment'));
index.get('/js',require('./index/js'));

module.exports = index;
