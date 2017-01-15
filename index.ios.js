import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app'

export default class dubtrackmobile extends Component {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('dubtrackmobile', () => dubtrackmobile);
