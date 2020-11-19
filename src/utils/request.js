import Taro from "@tarojs/taro";
import { base } from "@/utils/index";

// const HOSTNAME = 'http://restapi.amap.com';
const HOSTNAME = 'https://uukankan.com';

const request = async obj => {
  const { method, url } = obj;
  let { data } = obj;
  // const token = '123456789'

  const header = {
    // Authorization: `Bearer ${token}`,
  };

  const option = {
    url: HOSTNAME + url,
    data: data,
    method: method,
    header: header,
    success(res) {
      // 对不同状态的数据进行处理，执行不同的操作
      // 当 token 过期时，删除本地 token 重新执行
      if (res.statusCode === 401 && res.data.error.code === 30) {
        // Taro.removeStorageSync(STORAGE_TOKEN);
        console.log('删除本地，重新执行');
        request(obj);
      } else {
        obj.success && obj.success(res);
      }
    },
    fail(e) {
      new Error("网络请求出错");
    },
  };
  Taro.request(option);
};

export default class Http {
  async commonHttp(method, url, data) {
    return new Promise(async (resolve, reject) => {
      Taro.showNavigationBarLoading();
      try {
        const res = await base(request)({
          method,
          url,
          data,
        });
        Taro.hideNavigationBarLoading();
        switch (res.statusCode) {
          case 200:
          case 201:
            return resolve(res.data);
          case 500:
            Taro.showToast({
              title: "服务器发生错误，请检查服务器。",
              icon: "none",
            });
            reject(new Error(res.data.error.message));
            break;
          case 503:
            Taro.showToast({
              title: "服务不可用，服务器暂时过载或维护。",
              icon: "none",
            });
            reject(new Error(res.data));
            break;
          default:
            reject(error);
        }
      } catch (error) {
        Taro.hideNavigationBarLoading();
        reject(new Error("网络请求出错"));
      }
    });
  }

  get(url, data) {
    return this.commonHttp("GET", url, data);
  }

  post(url, data) {
    return this.commonHttp("POST", url, data);
  }

  delete(url, data) {
    return this.commonHttp("DELETE", url, data);
  }

  put(url, data) {
    return this.commonHttp("PUT", url, data);
  }
}
