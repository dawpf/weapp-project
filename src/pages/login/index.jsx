import { View, Button } from "@tarojs/components"
import React, { Component } from "react"

import Taro, { getCurrentInstance } from '@tarojs/taro'
import './index.less'

// import NavBar from '../../components/nav-bar/index'

class Login extends Component {

  componentWillMount() {
    // const { id, name } = this.$router.params;
    console.log('this.$router', this);
    Taro.setNavigationBarTitle({
      title: '登录页面'
    });
    Taro.setNavigationBarColor({
      backgroundColor: '#0000FF', frontColor: '#ffffff', animation: true
    })
  }

  componentDidMount() {
    console.log('使用getCurrentInstance方法获取到的页面传递的参数', getCurrentInstance().router.params);
  }

  componentDidShow() { }

  loginClick() {
    console.log('点击了login页面的按钮');
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }
  render() {
    return (
      <View className='login_container'>
        {/* <NavBar title='登录'></NavBar> */}
        <View>login页面</View>

        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home</Button>
      </View>
    )
  }
}

export default Login
