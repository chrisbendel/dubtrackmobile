GLOBAL = require('../src/Globals');

import React, { Component } from 'react';
// import React from 'react-native';
import { Text, Platform, Navigator, TouchableHighlight } from 'react-native';

import Home from './Home';
import Room from './Room';
import api from './api';

export default class app extends Component {
  constructor(props) {
    super(props);
    this.api = new api();

    this.api.startApi({username: 'dubtrackmobile', password: 'insecure'}, function(err, api) {
      if (err) console.error(err);

      console.log(api);

    });

    this.api.joinRoom('daftlabs');
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
    //TODO: make this a switch statement for all routes
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
