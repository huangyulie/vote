const {User,Stu} = require('../../model/user');

module.exports = async(req,res)=>{
    let id = req.query.id;
    let stu = await Stu.find({_id:id});
    if(stu.length == 0){
        stu = [{username:'',num:'',vote:'',sing:''}]
    }
    let stus;

    if(req.session.username !== undefined){
        stus = await User.find({username:req.session.username});
    }else{
        stus = [{data:4}];
    }
    let name = stu[0].username;
    let num = stu[0].num;
    let vote = stu[0].vote;
    let all = await Stu.find({})
    let arr = [];
    let sing = stu[0].sing;
    for(let i = 0;i<all.length;++i){
        arr.push(all[i].vote);
    }
    arr.sort((a,b)=>{return b-a});
    let number;
    for(let i = 0;i<arr.length;++i){
        if(arr[i] == stu[0].vote){
            number = i;
            break;
        }
    }
    brr = ['The First','The Second','The Third','The Fourth','The Fifth','The Sixth','The Seventh','The Eighth','The Ninth','The Tenth'];
    let crr = brr[number];
    res.render('index/parter',{
        msg:req.session.username,
        name: name,
        num:num,
        vote:vote,
        rank:crr,
        sing:sing,
        id:id,
        stus: stus[0].data,
        msg:req.session.username,
    });
}