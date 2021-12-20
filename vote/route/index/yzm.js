const {User,Stu,yzm} = require('../../model/user');

module.exports = (req,res)=>{
    console.log(typeof req.query.phone);
    let phonee = req.query.phone;
    var QcloudSms = require("qcloudsms_js");
    // 短信应用 SDK AppID
    var appid = 1400610282;  // SDK AppID 以1400开头
    // 短信应用 SDK AppKey
    var appkey = "89ead03624862eeefaa4f89820ec1c8e";
    // 需要发送短信的手机号码
    var phoneNumbers = [phonee];
    // 短信模板 ID，需要在短信控制台中申请
    var templateId = 1242363;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
    // 签名
    var smsSign = "个人设计个人网";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
    // 实例化 QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);
    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
    }
    
    var vertify = '0123456789'
    var sd = '';
    for (var i = 0; i < 6; i++) {
        //向下取整 
        var random = Math.floor( Math.random() * (vertify.length));
        //1：初始化验证码 空字符  res长度为6
        
        sd += vertify[random];
    }

    console.log(sd);
    yzm.create({
        yzm: sd,
    })

    var ssender = qcloudsms.SmsSingleSender();
    var params = [sd,"2"];
    ssender.sendWithParam("86", phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);

    res.send('发送成功');
}