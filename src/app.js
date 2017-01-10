import React, { Component } from 'react';
import { Text, Platform, Navigator, TouchableHighlight } from 'react-native';

import Home from './Home';

export default class app extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Home', index: 0 }}
        renderScene={(route, navigator) => {
          return <Home />
        }}
      />
    );
  }
}
