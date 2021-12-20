const {User,Stu,yzm} = require('../../model/user');
const { Comment } = require('../../model/comment');
const bcrypt = require('bcryptjs');
module.exports = async (req,res)=>{
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
                            let q = await yzm.findOne({yzm:req.body.yzm});
                            if(!q){
                                res.send(`<script>
                                alert('验证码错误') 
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
    }
}