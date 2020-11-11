import Taro from "@tarojs/taro";
import moment from "moment";
// import moment from 'moment'

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
 * @param imgURL
 * @returns {boolean}
 */
export function isPDF(imgURL) {
  return /(pdf|xls|xlsx|zip|rar|doc|docx)$/i.test(imgURL);
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
 * validate mobile
 * @param mobile
 * @returns {boolean}
 */
export function validateMobile(mobile) {
  const re = /^(13[0-9]|14[57]|15[0-9]|16[6]|17[0135678]|18[0-9]||19[0-9]|)[0-9]{8}$/;
  return re.test(mobile);
}

/**
 * validate CardId
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

/**
 * 根据两点经纬度计算距离
 * @param {*} gis1
 * @param {*} gis2
 */
export function calcDistance(gis1, gis2) {
  if (!gis1 || !gis2) return;
  const EARTH_RADIUS = 6378.137;
  const radLat1 = gis1.lat * Math.PI / 180.0;
  const radLat2 = gis2.lat * Math.PI / 180.0;
  const a = radLat1 - radLat2;
  const b = gis1.lon * Math.PI / 180.0 - gis2.lon * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  if (s > 1) {
    s = `${s.toFixed(1)}km`;
  } else {
    s = `${(s * 1000).toFixed(1)}m`;
  }
  return s;
}


/**
 *
 * @param skuList
 * @returns {Array}
 */
export function handleSkuDataList(skuList) {
  const arr = [];
  if (!skuList) {
    return [];
  }
  const productList = skuList.filter((item) => item.type === "sku");

  productList.forEach(item => {
    if (item.parent) {
      item.parent.quantity = item.quantity;
      item.parent.imageUrl = item.parent.image_urls.length ? item.parent.image_urls[0] : (item.parent.product && item.parent.product.image_urls[0]);
      item.parent.parentId = item.id;
      arr.push(item.parent);
    }
  });
  return arr;
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
 * 获取友好提示时间
 * @param {*} dateTimeStamp
 */
export const getFriendlyDate = (dateTimeStamp) => {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  // var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  // var weekC = diffValue / (7 * day)
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (dayC > 1) {
    if (monthC <= 12) {
      result = moment(dateTimeStamp).format("MM/DD");
    } else {
      result = moment(dateTimeStamp).format("YYYY/MM/DD");
    }
  }
  // else if (weekC >= 1) {
  // 	result = "" + parseInt(weekC) + "周前";
  // }
  else if (dayC == 1) {
    result = "昨天";
  } else if (hourC >= 1) {
    result = moment(dateTimeStamp).format("HH:mm");
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};


/**
 * 格式化商户审核
 * @param {*} merchantAudit
 */
export const formatMerchantApproval = (merchantAudit) => {
  if (!merchantAudit) {
    return {};
  }

  const platformInfo = merchantAudit.merchant_platform_info;
  merchantAudit.name = merchantAudit.merchant_name;
  // merchantAudit.contact_phone = platformInfo.contact.phone;
  // merchantAudit.contact_name = platformInfo.contact.name;
  merchantAudit.reservation_infos = platformInfo.reservation_infos;
  merchantAudit.category_names = platformInfo.merchant_category_names;
  merchantAudit.poi_id = platformInfo.address.poi_id;
  merchantAudit.gis = platformInfo.address.gis;
  merchantAudit.house_number = platformInfo.address.house_number;
  merchantAudit.floor_number = platformInfo.address.floor_number;
  merchantAudit.address = platformInfo.address.detail;
  merchantAudit.city = platformInfo.address.district_array.join(" ");
  merchantAudit.front_img_url = platformInfo.front_img_url;
  merchantAudit.nearby_img_url = platformInfo.nearby_img_url;
  merchantAudit.logo_img_url = platformInfo.logo_img_url;
  merchantAudit.average_transaction_amount = platformInfo.average_transaction_amount;

  const wechatInfo = merchantAudit.merchant_wechat_info;
  const businessLicense = wechatInfo.business_license;
  const account = wechatInfo.account;
  const idCard = wechatInfo.id_card;
  const idDoc = wechatInfo.id_doc;
  const contact = wechatInfo.contact;
  merchantAudit.identification_type = wechatInfo.organization_type || "personal";
  merchantAudit.is_same_document = (businessLicense.type === "three_in_one");
  merchantAudit.business_license = {
    business_license_image_url: businessLicense.img_url,
    code: businessLicense.number,
    name: businessLicense.company_name,
    address: businessLicense.company_address,
    legal_person: businessLicense.legal_person,
    placeholder_legal_person: businessLicense.legal_person,
    valid_start_at: businessLicense.valid_time ? moment(businessLicense.valid_time[0]).unix() : null,
    valid_end_at: businessLicense.valid_time && businessLicense.valid_time[1] !== "长期" ? moment(businessLicense.valid_time[1] || 0).unix() : null,
  };
  merchantAudit.bank_account = {
    type: account.bank_type || "personal",
    number: account.number,
    bank_name: account.bank_name,
    name: account.name,
    address: account.bank_address.join(" "),
    district_id: account.bank_address_code,
  };
  merchantAudit.legal_person = {
    id_doc_type: wechatInfo.id_doc_type || "id_card",
    placeholder_name: idCard.name,
    placeholder_number: idCard.number,
    name: idCard.name,
    number: idCard.number,
    personal_info_side_image_url: idCard.copy_img_url,
    national_emblem_side_image_url: idCard.national_img_url,
    valid_start_at: idCard.valid_time ? moment(idCard.valid_time[0]).unix() : null,
    valid_end_at: idCard.valid_time && idCard.valid_time[1] !== "长期" ? moment(idCard.valid_time[1] || 0).unix() : null,
    email: contact.email,
    placeholder_phone_number: contact.mobile,
  };
  if (wechatInfo.id_doc_type === "passport") {
    merchantAudit.legal_person.copy_img_url = idDoc.copy_img_url;
    merchantAudit.legal_person.valid_start_at = moment().unix();
    merchantAudit.legal_person.valid_end_at = idDoc.valid_end_time && idDoc.valid_end_time !== "长期" ? moment(idDoc.valid_end_time).unix() : null,
      merchantAudit.legal_person.placeholder_number = idDoc.number;
    merchantAudit.legal_person.placeholder_name = idDoc.name;
    merchantAudit.legal_person.number = idDoc.number;
    merchantAudit.legal_person.name = idDoc.name;
  }
  const occ = wechatInfo.organization_cert;
  merchantAudit.occ = {
    image_url: occ.img_url,
    code: occ.number,
    valid_start_at: occ.valid_time ? moment(occ.valid_time[0]).unix() : null,
    valid_end_at: occ.valid_time && occ.valid_time[1] !== "长期" ? moment(occ.valid_time[1] || 0).unix() : null,
  };
  merchantAudit.tax_certificate = {
    image_url: wechatInfo.tax_registration_cert.img_url,
  };
  merchantAudit.additional_certificates = wechatInfo.business_addition.img_urls || [];
  // 街区信息
  let commercial_areas_together = '';
  if (merchantAudit.commercial_areas && merchantAudit.commercial_areas.length) {
    merchantAudit.commercial_areas.forEach(v => {
      commercial_areas_together += v.name + ';'
    })
    commercial_areas_together = commercial_areas_together.slice(0, commercial_areas_together.length - 1);
  }
  merchantAudit.commercial_areas_together = commercial_areas_together
  return merchantAudit;
};

/**
 * 对 error code === 10 的错误处理
 * @param {*} error
 */
export const formatRequestError = (error) => {
  if (error.code === 10) {
    let keys = Object.keys(error.field);
    let messages = [];
    keys.forEach(key => {
      messages = messages.concat(error.field[key]);
    });
    error.message = messages.join(",");
  }
  return error;
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
 *    处理支付所需参数
 * @param respData
 * @returns {string | RTCOAuthCredential | ScopedCredential}
 */
export const handlePayParams = (respData) => {
  let payParams = {};
  const chargesList = respData.charges.data;
  if (respData.credential) {
    payParams = respData.credential;
  } else {
    const chargesWeChat = chargesList.filter(item => item.channel === "wechat")[0];
    payParams = chargesWeChat.credential;
  }
  return payParams;
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

export const handleDiscount = (item) => {
  const voucher = {
    ...item,
    isOverdue: !!item.end_at && (item.end_at * 1000 < new Date().getTime()),// 是否过期
    isUsed: !!(item.status === "locked" || item.status === "redeemed"),// 是否已使用
    isStart: !!item.start_at && (item.start_at * 1000 < new Date().getTime()), // 是否开始
    ...handlePrice(item.coupon),
  };
  voucher.isValid = (!voucher.isOverdue && !voucher.isUsed && voucher.isStart);

  voucher.endTime = handleExpireTime(voucher.isOverdue, item.start_at, item.end_at);

  if (voucher.type === "sku" && item.coupon.rules && item.coupon.rules.length) {
    let rule = item.coupon.rules.filter((i) => i.type === "sku")[0];
    if (!rule) {
      rule = item.coupon.rules.filter((i) => i.type === "product")[0];
      rule && rule.parent_id && (voucher.productId = rule.parent_id);
    } else {
      rule.parent_id && (voucher.skuId = rule.parent_id);
    }
  }
  return voucher;
};

export const handleCoupon = (item) => {
  const coupon = {
    ...item,
    isReceived: item.is_received,
    endTime: "",
    ...handlePrice(item),
  };
  coupon.isOverdue = !!item.redeem.ending_before && (item.redeem.ending_before * 1000 < new Date().getTime());// 是否过期
  coupon.endTime = handleExpireTime(coupon.isOverdue, item.redeem.starting_after, item.redeem.ending_before, item.redeem.available_seconds);
  coupon.tag = coupon.merchant_id ? "商家券" : "平台券";
  return coupon;
};

const handlePrice = (data) => {
  if (!data) {
    return;
  }
  const availableAmount = fen2Yuan(data.minimum_available_amount);
  data.desc = `无门槛券`;
  switch (data.type) {
    case "amount":
      data.price = `${fen2Yuan(data.amount_off)}`;
      if (data.minimum_available_amount) {
        const amountOff = fen2Yuan(data.amount_off);
        data.desc = `满${availableAmount}元减${amountOff}`;
      }
      break;
    case "percent":
      data.price = `${(100 - data.percent_off) / 10}`;
      data.maximum_discount_amount && (data.maxPrice = fen2Yuan(data.maximum_discount_amount));
      if (data.minimum_available_amount) {
        const percentOff = Math.round((10 - data.percent_off / 10) * 100) / 100;
        data.desc = `满${availableAmount}元打${percentOff}折`;
      }
      break;
    case "sku":
      data.price = "";
      break;
  }
  return data;
};

const handleExpireTime = (isOverdue, start_at, end_at, available_seconds = null) => {
  let endTime;
  if (isOverdue) {
    endTime = `${moment(start_at * 1000).format("YYYY.MM.DD")}-${moment(end_at * 1000).format("YYYY.MM.DD")}`;
  } else if (available_seconds) {
    let days = Math.ceil(+available_seconds / 86400);
    endTime = `领取后 ${days} 天内有效`;
  } else if (!end_at) {
    endTime = "长期有效";
  } else endTime = `有效期至 ${moment(end_at * 1000).format("YYYY.MM.DD")}`;

  return endTime;
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
 *
 * @param obj
 * @param maxDayList
 * @returns {Array}
 */
export const handleDateList = (obj, maxDayList) => {
  if (!obj) return [];
  if (!maxDayList) return [];

  const keys = Object.keys(obj);
  const arr = [];
  if (maxDayList > 5) maxDayList = 5;
  for (let i = 0; i < maxDayList; i++) {
    // 将时间置为零点
    let date = getCurrentDate0(new Date(new Date().setDate(new Date().getDate() + i)));

    let currentDay = new Date(date).getDay();
    if (obj[keys[currentDay]]) {
      let dateContent = moment(date).format("MM月DD日");
      // 判断是否是当天
      if (new Date().toDateString() === new Date(date).toDateString()) {
        dateContent = "今天";
      }
      arr.push({ date: dateContent, time: date });
    } else {
      maxDayList += 1;
      if (maxDayList > 5) maxDayList = 5;
    }
  }
  if (arr.length) arr[0].active = true;
  return arr;
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
 * 返回上一页
 */
export const onNavBack = () => {
  if (Taro.getCurrentPages().length === 1) {
    Taro.redirectTo({
      url: `/${HOME_PAGE}`,
    });
  } else {
    Taro.navigateBack();
  }
};

/**
 *
 * @param productItems
 * @returns {Array}
 */
export function handleProduct(productItems) {
  const skuList = [];
  if (!productItems) {
    return [];
  }
  const productList = productItems.filter((item) => item.type === "sku");

  productList.forEach(item => {
    if (item.parent) {
      item.parent.quantity = item.quantity;
      item.parent.imageUrl = item.parent.image_urls.length ? item.parent.image_urls[0] : (item.parent.product && item.parent.product.image_urls[0]);
      item.parent.parentId = item.id;
      skuList.push(item.parent);
    }
  });
  return skuList;
}

export const handleTabs = (tab, orderStatistic) => {
  tab.map(item => {
    switch (item.key) {
      case "created":
        item.num = orderStatistic.waiting_pay_count;
        return item;
      case "shipped":
        item.num = orderStatistic.returnable_virtual_item_count;
        return item;
      case "returned":
        item.num = orderStatistic.pending_return_count;
        return item;
      default:
        return item;

    }
  });
  return tab;
};
/**
 * 购买须知
 * @param {*} instruction
 */
export const formatInstructions = (instruction) => {
  let ins = [];
  // 有效期
  let validTime = "";
  const redeem = instruction.redeem || {};
  if (redeem.starting_after) {
    const startTime = formatTime(redeem.starting_after, "YYYY.MM.DD");
    const endTime = formatTime(redeem.ending_before, "YYYY.MM.DD");
    validTime = `有效期：${startTime} 至 ${endTime}`;
  } else if (redeem.available_seconds) {
    validTime = `有效期：购买后${Math.ceil(redeem.available_seconds / 86400)}天内有效`;
  } else {
    validTime = "有效期：购买后长期有效";
  }
  const blackoutDates = instruction.blackout_dates;
  let blackout = [];
  if (blackoutDates && blackoutDates.weekend) {
    blackout.push("周末");
  }
  if (blackoutDates && blackoutDates.holidays) {
    blackout.push("法定节假日");
  }
  if (blackoutDates && blackoutDates.date_ranges && blackoutDates.date_ranges.length) {
    let blackoutTime = blackoutDates.date_ranges.map(item => {
      return `${formatTime(item.starting, "YYYY.MM.DD")}-${formatTime(item.ending, "YYYY.MM.DD")}`;
    });
    blackoutTime.length && (blackout.push(blackoutTime.join(",")));
  }
  blackout.length && (validTime = `${validTime} (除${blackout.join("、")}外使用)`);
  ins.push(validTime);

  // 使用时间
  const useTime = instruction.available_time.map(item => {
    return `${item.starting}-${item.ending}`;
  }).join("  ");
  if (useTime) {
    ins.push(`使用时间：${useTime}`);
  } else {
    ins.push(`使用时间：不限时间段`);
  }
  // 使用规则
  if (instruction.rules) {
    ins.push(`使用规则：${instruction.rules}`);
  }
  // 预约信息
  let appointment = "";
  let hours = instruction.advance_reservation_seconds / 3600;
  if (hours < 23) {
    appointment = `需提前 ${Math.ceil(hours)} 小时预约`;
  } else {
    appointment = `需提前 ${Math.ceil(hours / 24)} 天预约`;
  }
  ins.push(`预约信息：${hours ? appointment : "无需预约"}`);

  return ins;
};

/**
 *
 * @param instruction
 * @returns {{validTime: string, tags: Array}}
 */
export const handleInstruction = (instruction) => {
  const tags = [];

  if (!instruction.id) {
    return {
      validTime: [],
      tags: [],
    };
  }

  // 有效期
  let validTime = "";
  const redeem = instruction.redeem || {};
  if (redeem.starting_after) {
    const startTime = formatTime(redeem.starting_after, "YYYY.MM.DD");
    const endTime = formatTime(redeem.ending_before, "YYYY.MM.DD");
    if (redeem.starting_after * 1000 > new Date()) {
      validTime = `${startTime} - ${endTime}`;
    } else {
      validTime = `有效期至 ${endTime}`;
    }
  } else if (redeem.available_seconds) {
    validTime = `购买后${Math.ceil(redeem.available_seconds / 86400)}天内有效`;
  } else {
    validTime = "长期有效";
  }
  // 预约信息
  let appointment = "";
  let hours = instruction.advance_reservation_seconds / 3600;
  if (hours < 23) {
    appointment = `需提前 ${Math.ceil(hours)} 小时预约`;
  } else {
    appointment = `需提前 ${Math.ceil(hours / 24)} 天预约`;
  }
  tags.push(`${hours ? appointment : "无需预约"}`);

  // 使用时间
  let useTime = "不限时间";
  const time = instruction.available_time.map(item => {
    return `${item.starting} - ${item.ending}`;
  }).join("  ");

  if (!!time) {
    useTime = time;
  } else {
    useTime = "不限时间";
  }
  tags.push(useTime);
  return {
    validTime,
    tags,
  };

};
/**
 * 判断是否是iphoneX iphone 11等机型
 */
export const isIphoneXFun = (phoneModel) => {
  return phoneModel.indexOf("iPhone X") > -1 || phoneModel.indexOf("unknown<iPhone12,") > -1;
};

/**
 * 营业时间
 */
export const handleOpeningHour = (merchant_opening_hour) => {
  if (!merchant_opening_hour) return "";
  const CurrentDate0 = getCurrentDate0(new Date());
  return `${moment(CurrentDate0 + merchant_opening_hour.start_at_1 * 1000).format("HH:mm")} - ${moment(CurrentDate0 + merchant_opening_hour.end_at_1 * 1000).format("HH:mm")}`;
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
