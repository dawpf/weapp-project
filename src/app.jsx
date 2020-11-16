import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.less'

const store = configStore()

class App extends Component {

  state = {
    data_app: 'app里面的数据'
  }

  componentDidMount() {
    console.log('Taro.ENV_TYPE', Taro.ENV_TYPE);
    console.log('process', process);
    console.log('Taro.getEnv() ', Taro.getEnv());

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
