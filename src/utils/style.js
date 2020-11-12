import Taro from "@tarojs/taro";

import {
  isIphoneXFun,
} from "./common";

/**
 * 判断是否为 IphoneX
 */
export function getIphoneX() {
  return isIphoneXFun(Taro.getSystemInfoSync().model);
}

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight() {
  const info = Taro.getSystemInfoSync();
  const { statusBarHeight, windowWidth } = info;
  return pxTransform(statusBarHeight, windowWidth);
  // return `${statusBarHeight}px`
}

/**
 * 获取标题栏高度
 * @param {Boolean} hasStatusBar 是否包含状态栏  默认包含
 * @param transform
 */
export function getTitleBarHeight(hasStatusBar = true, transform = true) {
  const info = Taro.getSystemInfoSync();
  const { statusBarHeight, windowWidth } = info;
  let titleHeight = hasStatusBar ? 46 + statusBarHeight : 46;
  if (transform) {
    return pxTransform(titleHeight, windowWidth);
  } else {
    return titleHeight;
  }
}

/**
 * 获取底部按钮高度
 */
export function getBottomBarHeight() {
  const info = Taro.getSystemInfoSync();
  const { windowWidth, model } = info;
  const bottomHeight = isIphoneXFun(model) ? 90 : 56;
  return pxTransform(bottomHeight, windowWidth);
}

/**
 * 获取屏幕高度
 */
export function getWindowHeight() {
  const info = Taro.getSystemInfoSync();
  const { windowHeight, windowWidth } = info;
  return pxTransform(windowHeight, windowWidth);
}

/**
 * 获取屏幕高度
 */
export function getWindowWidth() {
  const info = Taro.getSystemInfoSync();
  const { windowWidth } = info;
  return windowWidth;
}

/**
 * 自定义像素单位转换 px => rpx (注：只针对小程序转换)
 * @param {Number} px 需要转换的 px
 * @param {Number} windowWidth 屏幕宽度
 */
export function pxTransform(px, windowWidth) {
  if (!windowWidth) {
    windowWidth = Taro.getSystemInfoSync().windowWidth;
  }
  if (Taro.ENV_TYPE.WEAPP) {
    // 针对小程序做特殊处理
    return `${(750 / windowWidth) * px}rpx`;
  }

  return Taro.pxTransform(px);
}

/**
 * 合并 style
 * @param {Object|String} style1
 * @param {Object|String} style2
 * @returns {String}
 */
export function mergeStyle(style1, style2) {
  if (
    style1 &&
    typeof style1 === "object" &&
    (style2 && typeof style2 === "object")
  ) {
    return Object.assign({}, style1, style2);
  }
  return objectToString(style1) + objectToString(style2);
}

export function objectToString(style) {
  if (style && typeof style === "object") {
    let styleStr = "";
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      styleStr += `${lowerCaseKey}:${style[key]};`;
    });
    return styleStr;
  } else if (style && typeof style === "string") {
    return style;
  }
  return "";
};
