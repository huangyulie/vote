const { Comment } = require('../../model/comment');

module.exports = async(req,res)=>{
    const {content,username} = req.body;
    const num = await Comment.find({});
    const len = num.length;
    var date=new Date();
	//年
    var year=date.getFullYear();
    //月
    var month=date.getMonth()+1;
    //日
    var day=date.getDate();
    //时
    var hh=date.getHours();
    //分
    var mm=date.getMinutes();
    //秒
    var ss=date.getSeconds();
    var rq=year+"年"+month+"月"+day+"日"+hh+":"+mm+":"+ss;
    await Comment.create({
        content:content,
        uid:username,
        aid:len+1,
        time:rq
    })
    res.redirect('/index/talk');
}