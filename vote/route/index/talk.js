const {User,Stu} = require('../../model/user');
const { Comment } = require('../../model/comment');
module.exports = async(req,res)=>{
    let stu = await Stu.find({}),count = 0;
    const comment = await Comment.find({});

    let page = req.query.page || 1;
    let pagesize = 10;
    let count1 = await Comment.countDocuments({})
    let total = Math.ceil(count1 / pagesize);
    let start = (page-1)*pagesize;

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


    let comment1 = comment.sort(compare("aid"));
    let stu1 = stu.sort(compare("vote"));

    const comment2 = await Comment.find({}).limit(pagesize).skip(start);
    let com = [];
    for(let i = start;i<start+pagesize;++i){
        if(comment1[i]!==undefined){
            com.push(comment1[i]);
        }
    }
    res.render('index/talk',{
        msg:req.session.username,
        comment1:com,
        stu1:stu1,
        s1 : stu1[0],
        s2 : stu1[1],
        s3 : stu1[2],
        count:count,
        page:page,
        total:total
    });
}