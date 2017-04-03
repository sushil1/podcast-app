import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Featured} from './components/layout'
import store from './stores'
import {Provider } from 'react-redux'


const app = (
  <Provider store={store.initialize() }>
      <Featured />
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'))
