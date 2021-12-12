const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { number } = require('joi');

const userSchema =  new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:2,
        maxlength:20
    },
    phone:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    data:{
        type:Number,
        require:true
    }
});

const student =  new mongoose.Schema({
    username:{
        type:String,
    },
    grade:{
        type:String,
    },
    vote:{
        type:Number
    },
    num:{
        type:Number
    },
    sing:{
        type:String,
        require:true
    }
});

const User = mongoose.model('User',userSchema);
const Stu = mongoose.model('Stu',student);

// async function createUser(){
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123456',salt);
//     const users = await User.create({
//         username:'黄欲',
//         phone:'19991356321',
//         password: pass,
//         data: 0
//     }).then(()=>{
//         console.log("创建成功")
//     }).catch(()=>{
//         console.log("用户创建失败")
//     })
// }
// createUser();

// Stu.create({
//     username:'黄欲烈',
//     grade:'计科2009',
//     vote:4000,
//     num:10,
//     sing:'还过天空'
// })



module.exports = {
    User,Stu
}