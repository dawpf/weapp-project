import Taro from "@tarojs/taro";
import Service from "@/utils/service";

import REQUEST from '@/utils/request.js'
const request = new REQUEST()

/**
 * 获取行政区域
 * @param {*} params
 */
export function getAdministrative_division(params) {
  return request.get(Service.area, params);
}

/**
 * 查询功能
 * @param {*} params
 */
export function getSearch(params) {
  return request.get(Service.search, params);
}

