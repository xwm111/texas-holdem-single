let combinationtool = {};
// combinationtool.xwm=[]
combinationtool.make = (originarr, n, type) => {
    combinationtool.originarr = originarr;
    combinationtool.resultarr = [];
    combinationtool.state = [];
    let r = []
    switch (type) {
        case 1:
            combine_increase(originarr, 0, r, n, n, originarr.length);
            break;
        case 2:
            combine_decrease(originarr, originarr.length, r, n, n);
            break;
        case 3:
            cal(0, n);
            break;
        default:
    }
    return combinationtool.resultarr;
}

/**
 * 排列
 * @param {*} step 
 * @param {*} n 
 */
function cal(step, n) { //n，代表取几个元素。
    var flag = true;
    if (step === n) { //判断是否取出足够的元素。
        let temp = combinationtool.state;
        var arr = new Array(temp.length);
        for (let i = 0; i < temp.length; i++) {
            arr[i] = temp[i]
        }
        combinationtool.resultarr.push(arr); //把取出来的书方法数组中
        return 0; //结束循环
    }


    for (var i = 0; i < combinationtool.originarr.length; i++) { //循环数据
        for (var j = 0; j < combinationtool.state.length; j++) { //判断时候取出来重复的数。
            if (combinationtool.state[j] === combinationtool.originarr[i]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            combinationtool.state.push(combinationtool.originarr[i]); //保存当前环境
            cal(step + 1, n);
            combinationtool.state.pop(combinationtool.originarr[i]); //回退到上一层的环境
        }

        flag = true;


    }
}

/**
 * 参考算法 https://www.cnblogs.com/shuaiwhu/archive/2012/04/27/2473788.html
 * @param {原始数组} arr 
 * @param {遍历起始位置} start 0 从前向后组合
 * @param {保存索引结果} result 
 * @param {result数组的长度,需要和n相同} count 
 * @param {要选取的元素个数} n 
 * @param {原始数组长度} arr_len 
 * 
 */
function combine_increase(arr, start, result, count, n, arr_len) {
    for (let i = start; i < arr_len + 1 - count; i++) {
        result[count - 1] = i;
        if (count - 1 === 0) {
            let j;
            let temparr = []
            for (j = n - 1; j >= 0; j--) { //倒过来输出
                temparr.push(arr[result[j]])
            }
            combinationtool.resultarr.push(temparr); //把取出来的书方法数组中
        } else {
            combine_increase(arr, i + 1, result, count - 1, n, arr_len);
        }
    }
}

/**
 * 参考算法 https://www.cnblogs.com/shuaiwhu/archive/2012/04/27/2473788.html
 * @param {原始数组} arr 
 * @param {遍历起始位置} start 数组长度 从后向前组合
 * @param {保存索引结果} result 
 * @param {result数组的长度,需要和n相同} count 
 * @param {要选取的元素个数} n 
 */
function combine_decrease(arr, start, result, count, n) {
    for (let i = start; i >= count; i--) {
        result[count - 1] = i;
        result[count - 1] = i - 1;
        if (count > 1) {
            combine_decrease(arr, i - 1, result, count - 1, n);
        } else {
            let j;
            let temparr = []
            for (j = n - 1; j >= 0; j--) {
                temparr.push(arr[result[j]])
            }
            combinationtool.resultarr.push(temparr); //把取出来的书方法数组中
        }
    }
}

module.exports = combinationtool;