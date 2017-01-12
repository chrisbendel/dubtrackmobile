GLOBAL = require('../src/Globals');

import React, { Component } from 'react';
// import React from 'react-native';
import { Text, Platform, Navigator, TouchableHighlight } from 'react-native';

import Home from './Home';
import Room from './Room';
import webSocket from './webSocket';

export default class app extends Component {
  constructor(props) {
    super(props);
    var socket = new webSocket();
    // let socket = new webSocket;

  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: GLOBAL.ROUTES.HOME.TITLE, index: GLOBAL.ROUTES.HOME.INDEX }}
        renderScene={this.renderScene}
      />
    );
  }
  renderScene(route, navigator) {
    //TODO: make this a switch statement
    if(route.name == 'Home') {
      return (
        <Home
          navigator = {navigator}
          {...route.passProps}
        />
      );
    }
    if (route.name == 'Room') {
      return (
        <Room
          navigator = {navigator}
          {...route.passProps}
        />
      );
    }
  }
}
