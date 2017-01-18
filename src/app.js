GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, Platform, Menu, Navigator, TouchableHighlight} from 'react-native';
const SideMenu = require('react-native-side-menu');

import Home from './Home';
import Room from './Room';
import Settings from './Settings';
import DubAPI from './DubAPI/index';

export default class app extends Component {
  static api = new DubAPI({username: 'dubtrackmobile', password: 'insecure'}, function (err, bot) {
  });

  componentDidMount() {
  }

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let component;
    switch (route.title) {
      case 'Home':
        component =
          <Home
            navigator={navigator}
            {...route.passProps}
            api={app.api}/>;
        break;
      case
      'Room':
        component =
          <Room
            navigator={navigator}
            {...route.passProps}
            api={app.api}/>;
        break;
      case
      'Settings':
        component =
          <Settings
            navigator={navigator}
            {...route.passProps}
            api={app.api}/>
        break;
      default:
        component = null;
    }
    return component;
  };

  render() {
    const routes = [
      {title: 'Home', index: 0},
      {title: 'Room', index: 1},
      {title: 'Settings', index: 2}
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.renderScene
        }>
      </Navigator>
    );
  }
}
