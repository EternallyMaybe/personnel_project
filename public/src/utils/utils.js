/**
 * @desc 将平级数组重组为嵌套数组
 * @param {array} arr 原始数据
 * @param {string} parent 父元素
 * @returns {array}
 */
const getNestArr = (arr, parent='') => {
    let newArr = [];
    for (let i = 0, total = arr.length; i < total; i++) {
        if (arr[i].parent === parent) {
            if (!arr[i].isLeaf) {
                arr[i].children = getNestArr(arr, arr[i].codeLetter)
            }
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

const formatDate = (time, format) => {
    let date = new Date(time);
    let o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

export {
    getNestArr,
    formatDate
}