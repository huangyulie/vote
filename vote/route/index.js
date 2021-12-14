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

index.post('/register',async (req,res)=>{
    // res.send(req.body);

    // const schema = {
    //     username: joi.string().min(2).max(10).required().error(new Error('用户名不符合条件')),
    //     phone: joi.string().regex(/^1[0-9]{10}$/).required().error(new Error('手机号码不正确')),
    //     password:joi.string().min(6).max(20).required().error(new Error('密码格式不正确')),
    // }
    const myphone = /^[1][0-9]{10}$/;
    const myname = req.body.username;
    const mypwd = req.body.password1;
    if(myname.trim().length<=1 || myname.trim().length > 20){
        res.send(`<script>
                alert('请输入正确的用户名') 
                setTimeout(()=>{
                    window.history.back(-1)
                },300)
                </script>`);
    }else{
        if(!myphone.test(req.body.phone)){
            res.send(`<script>
                alert('请输入正确的手机号码') 
                setTimeout(()=>{
                    window.history.back(-1)
                },300)
                </script>`);
        }else{
            if(req.body.password1 != req.body.password2){
                res.send(`<script>
                    alert('两次密码不一致') 
                    setTimeout(()=>{
                        window.history.back(-1)
                    },300)
                    </script>`);
            }
            else {
                if(mypwd.trim().length<6 || mypwd.trim().length>20){
                    res.send(`<script>
                    alert('密码不符合') 
                    setTimeout(()=>{
                        window.history.back(-1)
                    },300)
                    </script>`);
                }else{
                    let userss = await User.findOne({username:myname});
                    if(userss){
                        res.send(`<script>
                        alert('用户名已被注册') 
                        setTimeout(()=>{
                            window.history.back(-1)
                        },300)
                        </script>`);
                    }else{
                        let p = await User.findOne({phone:req.body.phone});
                        if(p){
                            res.send(`<script>
                            alert('手机号已被注册') 
                            setTimeout(()=>{
                                window.history.back(-1)
                            },300)
                            </script>`);
                        }else{
                            const salt = await bcrypt.genSalt(10);
                            const pass = await bcrypt.hash(mypwd,salt);
                            req.body.password1 = pass;
                            await User.create({
                                username:   req.body.username,
                                phone:      req.body.phone,
                                password:   req.body.password1,
                                data: 0,
                            })
                            res.send(`<script>
                            alert('恭喜你注册成功'); 
                            setTimeout(()=>{
                                window.location.href="login";
                            },300)
                            </script>`);
                        }
                    }
                }
            }
        }
    }
})

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

index.get('/parter',require('./index/parter'));
//暴露
index.get('/rank',require('./index/rank'));
index.get('/talk',require('./index/talk'));
index.post('/comment',require('./index/comment'));
index.get('/js',require('./index/js'));

module.exports = index;
