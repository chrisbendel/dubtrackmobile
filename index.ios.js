import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app'

export default class dubtrackmobile extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <App />
    )
  }
}
AppRegistry.registerComponent('dubtrackmobile', () => dubtrackmobile);
