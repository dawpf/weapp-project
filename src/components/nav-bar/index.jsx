/* eslint-disable react/react-in-jsx-scope */
import Taro from "@tarojs/taro";
import React, { Component } from 'react'
import { View, Image, Text, Block } from "@tarojs/components";
import classNames from "classnames";
import { getStatusBarHeight, getTitleBarHeight } from "../../utils/style";

// 图片资源
import backBlackIcon from "./assets/ic-back-black.svg";
import backWhiteIcon from "./assets/ic-back-white.svg";
import backHomeIcon from "./assets/ic-back-home.svg";
import backHomeWhiteIcon from "./assets/ic-back-home-white.svg";

import "./index.less";

const HomePage = '/pages/home/index';

export default class NavBar extends Component {

  componentDidMount() {
    console.log('getTitleBarHeight()', getTitleBarHeight());
    console.log('getStatusBarHeight()', getStatusBarHeight());
  }

  onClickBackIcon() {
    const { beforeBackCheck } = this.props;
    if (beforeBackCheck) {
      this.props.onBack();
      return;
    }
    if (Taro.getCurrentPages().length > 1) {
      Taro.navigateBack();
    } else {
      Taro.redirectTo({
        url: HomePage,
      });
    }
  }

  onClickBackHome() {
    const pages = Taro.getCurrentPages();
    if (HomePage.indexOf(pages[0].route) > -1) {
      Taro.navigateBack({
        delta: pages.length - 1,
      });
    } else {
      Taro.redirectTo({
        url: HomePage,
      });
    }

  }

  getNavBarStyle() {
    const { backgroundColor, backgroundImage, background } = this.props;
    console.log({
      "height": getTitleBarHeight(),
      "padding-top": getStatusBarHeight(),
      "background-color": backgroundColor,
      "background-image": "url(" + backgroundImage + ")",
      "background": background,
    });
    return {
      "height": getTitleBarHeight(),
      "padding-top": getStatusBarHeight(),
      "background-color": backgroundColor,
      "background-image": "url(" + backgroundImage + ")",
      "background": background,
    };
  }

  render() {
    const {
      noPlaceHolder,
      title,
      titleStyle,
      hasBack,
      customLeft,
      textStyle,
      hasBackHome,
      showHome,
      hasChildren,
    } = this.props;
    let backIcon = backBlackIcon;
    if (titleStyle === "white") {
      backIcon = backWhiteIcon;
    }
    let backHome = false;
    if (Taro.getCurrentPages().length === 1 || showHome) {
      backIcon = backHomeIcon;
      if (titleStyle === "white") backIcon = backHomeWhiteIcon;
      backHome = true;
    }
    return (
      <View className='nav_bar'>
        <View className='nav_bar_content' style={this.getNavBarStyle()}>
          <View className="nav_bar_content_container">
            <Image className='icon_left_back pl11'
              src={backIcon} onClick={this.onClickBackIcon}
            ></Image>

            <View className='nav_bar_content_center'>
              {title}
            </View>
          </View>
        </View>
      </View >
    );
  }
}

NavBar.defaultProps = {
  noPlaceHolder: false,
  title: "",
  backgroundColor: "#fff",
  titleStyle: "black",
  textStyle: "small",
  hasBack: true,
  customLeft: false,
  beforeBackCheck: false,
  hasBackHome: false,
  showHome: false,
  backgroundImage: '',
  onBack: () => {
  },
};
