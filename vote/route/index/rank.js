const {User,Stu} = require('../../model/user');

module.exports = async(req,res)=>{
    let stu = await Stu.find({}),count = 0;
    for(let i = 0 ;i < stu.length; ++i){
        count = count + stu[i].vote;
    }
    function compare(property){
        return function(obj1,obj2){
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value2 - value1;     // 升序
        }
    }
    let stu1 = stu.sort(compare("vote"));

    res.render('index/rank',{
        msg:req.session.username,
        stu1:stu1,
        s1 : stu1[0],
        s2 : stu1[1],
        s3 : stu1[2],
        count:count
    });
}