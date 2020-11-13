import Taro from '@tarojs/taro'

let base = 'http://restapi.amap.com'
let token = 'token'

function request(params, method = 'GET') {
  return new Promise((resolve, reject) => {
    let { url, data } = params
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    return Taro.request({
      isShowLoading: false,
      url: base + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'token': token }, // 默认contentType ,预留token
      success(res) {
        resolve(res.data)
      },
      error(e) {
        reject(logError('api', '请求接口出现问题', e))
      }
    })
  })
}


export function get(url, data = '') {
  let option = { url, data }
  return request(option)
}

export const post = (url, data, contentType) => {
  let params = { url, data, contentType }
  return request(params, 'POST')
}
