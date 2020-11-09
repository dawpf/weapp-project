import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Button } from '@tarojs/components'
import { add } from '../../actions/home'

import './index.less'

@connect(state => ({
	home: state.home,
}), { add })

class Home extends Component {

  addClick(){
    console.log('点击了添加');
    this.props.add()
  }

  goLogin(){
    console.log('点击了跳转按钮');
  }

  render () {
    return (
      <View className='index'>
        <View>这是index页面</View>
        <View>{this.props.home.num}</View>
        <Button className='btn' onClick={this.addClick.bind(this)}>累加</Button>
        <Button className='btn' onClick={this.goLogin.bind(this)}>跳转login</Button>
      </View>
    )
  }
}

export default Home

