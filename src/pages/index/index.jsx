import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { connect } from "redux";
import { View, Button, Text } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'

@connect(state => ({
	counter: state.counter,
}), {
	add,
  minus,
  asyncAdd,
})

class Index extends Component {

  componentWillUnmount () {

   }

  componentDidShow () {
    console.log('this---',this);
  }

  componentDidHide () { }

  addClick(){
    console.log('点击了添加this',this);
    this.props.add(4)
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.addClick.bind(this)}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index

