import Taro from "@tarojs/taro";
import moment from "moment";

const OSS_HOSTNAME = process.env.OSS_HOSTNAME;
const HOME_PAGE = 'pages/home/index'
/**
 *
 * @param params
 * @returns {string}
 */
function constructUrl(params = "") {
  if (typeof (params) !== "object") {
    return "";
  }
  let url = "?";
  for (let key in params) {
    let value = params[key];
    if (typeof (value) === "object" && !(key === "startDate" || key === "endDate")) {
      url += constructUrl(value).replace("?", "");
    } else if (value || value === 0) {
      url = `${url}${key}=${value}&`;
    }
  }
  return url;
}

/**
 *
 * @param params
 * @returns {string}
 */
export function constructQueryParams(params) {
  let url = constructUrl(params);
  return url.slice(0, url.length - 1);
}


/**
 *
 * @param url
 * @returns {Object}
 */
export function getRequest(url) {
  let theRequest = new Object();
  if (url.indexOf("?") !== -1) {
    let str = url.split("?")[1];
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

/**
 * 深拷贝
 * @param source
 * @returns {*}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 判断值是否为空
 * @param  {String} str 参数
 * @return {Boolean} 判断结果
 */
export const isEmpty = (str) => {
  let _str = `${str}`.trim();
  return ["", "undefined", "null"].indexOf(_str) > -1;
};

/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function validateMobile(mobile) {
  const re = /^(13[0-9]|14[57]|15[0-9]|16[6]|17[0135678]|18[0-9]||19[0-9]|)[0-9]{8}$/;
  return re.test(mobile);
}

/**
 * 验证身份证
 * @param CardId
 * @returns {boolean}
 */
export function validateCardId(CardId) {
  const re = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/; //验证身份证
  return re.test(CardId);
}

/**
 * 验证邮箱
 * @param {*} email
 * * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return re.test(email);
}

/**
 * 金额转换  分 -> 元
 * @param {*} num
 */
export const fen2Yuan = (num, decimal = 2) => {
  num = (+num); // 防止出现字符串类型
  if (Number.isNaN(num) || isEmpty(num)) {
    return "";
  }
  let price = Number(num);
  price = (+price);
  if (price === 0) {
    return 0;
  }
  let yuan = price / 100;
  if (Number.isInteger(yuan)) {
    return yuan;
  }
  return Number(yuan.toFixed(decimal));
};

/**
 * 格式化时间
 * @param {*} time
 * @param {*} format
 */
export function formatTime(time = Math.ceil(Date.now / 1000), format = "MM-DD") {
  // const now = Math.ceil(Date.now / 1000)
  // let duration = now - time
  // if (duration < 60) {
  // 	return "刚刚"
  // }
  // else if () {
  // 	return
  // }
  return moment(time * 1000).format(format);
}

/**
 * 格式化时间
 * 显示 如：6月5日 18:00:00
 * @param {*} timestamp
 */
export function formatTimestamp(t) {
  var now = new Date(t * 1000);
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  var minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  return month + "月" + date + "日" + "   " + hour + ":" + minute + ":" + second;
}


// 小程序码参数转 json
export const uri2Json = (scene) => {
  let decodeScene = decodeURIComponent(scene);
  let arr = decodeScene.split("&");
  var theRequest = new Object();
  for (var i = 0; i < arr.length; i++) {
    var kye = arr[i].split("=")[0];
    var value = arr[i].split("=")[1];
    // 给对象赋值
    theRequest[kye] = value;
  }
  return theRequest;
};

/**
 *
 * 对象数组合并去重
 *
 * @param {*} newArr 新对象数组
 * @param {*} oldArr 旧对象数组
 * @param {*} key 按照 key 值去重
 */
export const uniqueArr = (newArr, oldArr, key) => {
  try {
    let result = {};
    let arr = [].concat(newArr).concat(oldArr);
    let finalResult = [];
    arr.forEach((item) => {
      // 加上字符串符号, 防止自动排序
      result[`r${item[key]}`] = item;
    });
    //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
    for (let item in result) {
      finalResult.push(result[item]);
    }
    return finalResult;
  } catch (err) {
    console.error(err);
    return newArr;
  }

};


/**
 *
 * @param val
 * @returns {string | number}
 */
export const limitFloatInput = (val, decimal = 2) => {
  let sNum = val.toString();
  if (sNum.indexOf(".") === 0) {//第一位就是 .
    sNum = "0" + sNum;
  }
  sNum = sNum.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
  sNum = sNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  sNum = sNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  let re = decimal === 2 ? /^(\-)*(\d+)\.(\d\d).*$/ : /^(\-)*(\d+)\.(\d).*$/;
  sNum = sNum.replace(re, "$1$2.$3");//只能输入两个小数
  // sNum = sNum.replace(/^\d{0,8}(\.\d{1,5})?$/, '$1$2.$3');//只能输入两个小数
  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (sNum.indexOf(".") < 0 && sNum !== "") {
    sNum = parseFloat(sNum);
  }

  return sNum;
};


/**
 * @description 如果数字不足两位，在前面加一个 `0`。例如 `1` => `01`
 * @param {Number} n
 */
export const fixNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

/**
 * 时间间隔转时间[hours, minutes]
 * @param {*} interval 时间间隔 (0 ~ 86399) 单位：秒
 */
export const interval2Time = (interval) => {
  let duration = moment.duration(interval * 1000);
  return [fixNumber(duration.get("hours") || 0), fixNumber(duration.get("minutes") || 0)];
};


/**
 * 将时间置为零点
 * @param date
 * @returns {*|number}
 */
export const getCurrentDate0 = (date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

const timeToSec = (time) => {
  const hour = time.split(":")[0];
  const min = time.split(":")[1];
  const s = Number(hour * 3600) + Number(min * 60);
  return s * 1000;
};

/**
 *
 * @param arr
 * @returns {{date: *, time: *}[]}
 */
export const handleTimeList = (arr, immediateTime, currentChooseDateTime) => {
  const currentTime = getCurrentDate0(new Date());
  const list = [];
  const resultList = [];
  const start = [], end = []; //start起始时间数组，end结束时间数组
  const OneHour = 60 * 60 * 1000;
  if (!arr || !arr.length) return [{}];
  let isInTime = false; // 用于判断立即送出时间是否在营业时间内

  arr.map(item => {
    start.push(item[0] * 1000 + currentTime);
    end.push(item[item.length - 1] * 1000 + currentTime);
  });

  function staticFormatTime(time) { //时间为个位数则补零
    return time < 10 ? "0" + time : time;
  }

  start.map((item, i) => {
    //计算各子区间以一小时为间隔拆分后的数组长度
    let len2 = (end[i] - start[i]) / (OneHour);
    for (let j = 0; j < len2; j++) {
      if (start[i] + OneHour <= end[i]) {
        //将各子区间日期按一小时递增转换为时间并存入list数组
        let ss = new Date(start[i] + OneHour * j),
          ee = new Date(start[i] + OneHour * (j + 1));
        list.push([staticFormatTime(new Date(ss).getHours()) + ":" + staticFormatTime(new Date(ss).getMinutes()), staticFormatTime(new Date(ee).getHours()) + ":" + staticFormatTime(new Date(ee).getMinutes())]);
      }
    }
    if (item < immediateTime * 1000 && immediateTime * 1000 < end[i]) {
      isInTime = true;
    }
  });
  list.map(item => {
    // 是否为今天
    if (new Date(currentChooseDateTime).toDateString() === new Date().toDateString()) {
      // 时间差
      if (immediateTime * 1000 - currentChooseDateTime < timeToSec(item[0])) {
        resultList.push({ date: item.join("-"), time: timeToSec(item[0]) });
      }
    } else {
      resultList.push({ date: item.join("-"), time: timeToSec(item[0]) });
    }
  });

  if (!resultList.length) return [];
  if (new Date(currentChooseDateTime).toDateString() === new Date().toDateString()) {
    if (isInTime) {
      resultList.unshift({ date: "立即送出", time: immediateTime * 1000 - currentTime });
    }
  }
  if (resultList.length) resultList[0].active = true;

  return resultList;
};


/**
 * 批量加载字体
 * @param {*} obj font 数组/对象
 */
export const loadFontFaces = (obj = []) => {
  let arr = [];
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    arr = obj;
  } else {
    arr.push(obj);
  }
  arr.map(o => {
    Taro.loadFontFace({
      family: o.family,
      source: `url("${OSS_HOSTNAME}/fonts/${o.source}")`,
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      },
    });
  });
};


/**
 * 判断是否是iphoneX iphone 11等机型
 */
export const isIphoneXFun = (phoneModel) => {
  return phoneModel.indexOf("iPhone X") > -1 || phoneModel.indexOf("unknown<iPhone12,") > -1;
};

export const getStartTime = (time) => {
  if (!time) return;
  const nowTimeDate = new Date(time);
  const timer = nowTimeDate.setHours(0, 0, 0, 0);
  return timer / 1000;
};

export const getEndTime = (time) => {
  if (!time) return;
  const nowTimeDate = new Date(time);
  const timer = moment(nowTimeDate.setHours(23, 59, 59, 0));
  return timer / 1000;
};
