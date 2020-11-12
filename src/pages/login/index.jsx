import { View, Button } from "@tarojs/components"
import React, { Component } from "react"

import Taro, { getCurrentInstance } from '@tarojs/taro'
import './index.less'

import NavBar from '../../components/nav-bar/index'

class Login extends Component {

  componentWillMount() { }

  componentDidMount() {
    console.log('使用getCurrentInstance方法获取到的页面传递的参数', getCurrentInstance().router.params);
  }

  componentDidShow() { }

  loginClick() {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }
  render() {
    return (
      <View className='login_container'>
        <NavBar title='登录' backgroundColor="#fff"></NavBar>
        <View>login页面</View>

        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home1</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home2</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home3</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home4</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home5</Button>
        <Button className='btn' onClick={this.loginClick.bind(this)}>跳转home6</Button>
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
