import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

import { View, Button } from '@tarojs/components'
import { add } from '@/actions/home'

import { getAdministrative_division, getSearch } from "../../api/home";

import NavBar from '../../components/nav-bar/index'

import './index.less'

@connect(state => ({
  home: state.home,
}), { add })

class Home extends React.Component {

  state = {
    data1: 'home数据1',
    data2: 'home数据2',
    cityData: []
  }

  async componentDidMount() {
    try {
      const payLoad1 = {
        key: "5551f26eca926b51ac0d81d3ead186d1"
      }
      const payLoad2 = {
        key: "5551f26eca926b51ac0d81d3ead186d1",
        keywords: '招商银行',
        city: '上海'
      }
      await getAdministrative_division(payLoad1)
      const res = await getSearch(payLoad2)
      this.setState({
        cityData: res.pois
      })

    } catch (error) {
      console.log(error);
    }
  }

  addClick() {
    this.props.add()
  }

  goLogin() {
    Taro.navigateTo({
      url: '/pages/login/index?id=2&type=test'
    })
  }

  stateClick() {
    this.setState({
      data1: '改变后的数据'
    })
  }

  render() {
    const { data1, data2 } = this.state
    return (
      <View className='home'>
        <NavBar title='首页1234567898765432'></NavBar>
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

