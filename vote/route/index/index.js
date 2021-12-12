const {User,Stu} = require('../../model/user');

module.exports = async(req,res)=>{
    let stu = await Stu.find({});

    function compare(property){
        return function(obj1,obj2){
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value2 - value1;     // 升序
        }
    }
    let stu1 = stu.sort(compare("vote"));


    let stus;

    if(req.session.username !== undefined){
        stus = await User.find({username:req.session.username});
    }else{
        stus = [{data:4}];
    }

    res.render('index/index',{
        msg:req.session.username,
        stu1:stu1,
        s1 : stu1[0],
        s2 : stu1[1],
        s3 : stu1[2],
        stus: stus[0].data
    });
}