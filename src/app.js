GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator, Image} from 'react-native';

import Home from './Home';
import Room from './Room';
import Client from './DubBot/client';
import Settings from './Settings';
import Messages from './Messages';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Menu from './Menu';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new Client();

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router sceneStyle={{backgroundColor:'#F7F7F7'}} hideNavBar={true}>
        <Scene key="menu" component={Menu} open={false}>
          <Scene key="messages" component={Messages} open={false} tabs={true}>
            <Scene key="root">
              <Scene key="home"
                     initial
                     component={Home}
                     title="Home"/>
              <Scene key="room" component={Room} user={app.user} title="Room"/>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
