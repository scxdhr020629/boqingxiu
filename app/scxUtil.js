/**
 * 这里面用来写一些scx的工具函数
 */

// 判断是不是手机号

function checkMobile(s) {
    var length = s.length;
    if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
        return true;
    } else {
        return false;
    }
}



function addTime8(oldTimes1) {
    var time1 = oldTimes1.split(' ')[0];
    // console.log("1、第二种方式time1:" + time1)
    var arrTime = oldTimes1.split(' ')[1].split(':');
    // console.log("2、第二种方式arrTime:" + arrTime)
    var time2 = arrTime.slice(1, arrTime.length).join(':');
    // console.log("3、第二种方式time2:" + time2)
    var h = parseInt(arrTime[0]) + 8;
    // console.log('4、第二种方式小时：', h);
    var newH = ((h < 24) ? h : (h % 24)).toString();
    return time1 + ' ' + newH + ':' + time2;
}


export default { checkMobile, addTime8 }