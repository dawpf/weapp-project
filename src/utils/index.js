import Taro from "@tarojs/taro";

const STORAGE_TOKEN = 'token'
const STORAGE_USER = 'STORAGE_USER'
const REFRESH_USER_INFO = 'REFRESH_USER_INFO'
const VERSION = '1.0.0'

const HOSTNAME = process.env.API_HOSTNAME;
const contentType = 'application/json'

/**
 * 封装 Promise
 */
export const base = (request) => (obj) => new Promise((resolve, reject) => {
  const _object = Object.assign(obj, {
    success: (res) => resolve(res),
    fail: (err) => reject(err)
  });
  request(_object);
});

/**
 * 封装节流函数
 * @param fn
 * @param delay
 */
export function throttle(fn, delay) {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > delay) {
      previous = now
      fn.apply(this, args)
    }
  }
}

/**
* @param fn 是需要防抖处理的函数
* @param wait 是时间间隔
* @param immediate 表示第一次是否立即执行
* @return {function}    返回客户调用函数
*/
export function debounce(fn, wait = 50, immediate) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(this, args)
      immediate = false
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 获取微信登录凭证
export const wxLogin = async () => {
  try {
    const res = await Taro.login();
    return res.code;
  } catch (error) {
  }
};


export const userLogin = async (forceRefresh) => {
  try {
    if (!Taro.getStorageSync(STORAGE_TOKEN) || forceRefresh) {
      throw new Error("本地没有缓存token 或 强制刷新")
    }
    return { token: Taro.getStorageSync(STORAGE_TOKEN) }
  } catch (error) {
    const code = await wxLogin();
    let data = {
      code: code,
      client: "weapp"
    }

    const loginRes = await Taro.request({
      url: HOSTNAME + '/tokens',
      data: data,
      header: getRequestHeader(),
      method: "POST"
    })
    const res = loginRes.data.data
    Taro.setStorageSync(STORAGE_TOKEN, res.token)
    Taro.setStorageSync(STORAGE_USER, res.user)
    // 刷新 User
    Taro.eventCenter.trigger(REFRESH_USER_INFO)
    return { user: res.user, token: res.token }
  }
};

/**
 * 上传文件
 * @param {*} obj
 */
export const uploadFile = async (obj) => {
  let tokenData = await userLogin()

  return Taro.uploadFile({
    url: HOSTNAME + obj.url,
    filePath: obj.filePath,
    name: 'file',
    header: {
      "Authorization": `Bearer ${tokenData.token}`,
    },
    formData: obj.data || {}
  })
}
