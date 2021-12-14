const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    //楼层
    aid:{
        type:Number,
    },
    //用户ID
    uid:{
        type:String,
    },
    //时间
    time:{
        type:String
    },
    content:{
        type:String
    }
});

const Comment = mongoose.model('comment',commentSchema);

module.exports = {
    Comment
}