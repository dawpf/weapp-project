import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

import { View, Button } from '@tarojs/components'
import { add } from '@/actions/home'

import NavBar from '../../components/nav-bar/index'

import './index.less'

@connect(state => ({
  home: state.home,
}), { add })

class Home extends Component {

  state = {
    data1: 'home数据1',
    data2: 'home数据2'
  }

  addClick() {
    console.log('点击了添加');
    this.props.add()
  }

  goLogin() {
    console.log('点击了跳转按钮');
    Taro.navigateTo({
      url: '/pages/login/index?id=2&type=test'
    })
  }

  stateClick() {
    console.log('点击了数据');
    this.setState({
      data1: '改变后的数据'
    })
  }

  render() {
    const { data1, data2 } = this.state
    return (
      <View className='home'>
        <NavBar title='首页1234567898765432' backgroundColor="green"></NavBar>
        <View>这是index页面：{data1}--{data2}</View>
        <View>{this.props.home.num}</View>
        <View className='btn' onClick={this.addClick.bind(this)}>累加</View>
        <View className='btn' onClick={this.goLogin.bind(this)}>跳转login</View>
        <View className='btn' onClick={this.stateClick.bind(this)}>改变数据</View>
      </View>
    )
  }
}

export default Home

