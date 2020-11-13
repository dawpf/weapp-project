import Taro from "@tarojs/taro";
import { get, post } from "../utils/request";
import Service from "../utils/service";

import HTTP from '@/utils/http.js'
const http = new HTTP()

/**
 * 获取行政区域
 * @param {*} params
 */
export function getAdministrative_division(params) {
  return get(Service.area, params);
}

/**
 * 查询功能
 * @param {*} params
 */
export function getSearch(params) {
  return http.get(Service.search, params);
}
