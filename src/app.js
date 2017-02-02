GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator, Image} from 'react-native';

import Home from './Home';
import Room from './Room';
import Client from './DubBot/client';
import Settings from './Settings';
import {Actions, Scene, Router} from 'react-native-router-flux';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new Client();

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router sceneStyle={{backgroundColor:'#F7F7F7'}}>
        <Scene key="root" hideNavBar={true}>
          <Scene key="home"
                 initial={true}
                 component={Home}
                 title="Home"
          />
          <Scene key="room" component={Room} user={app.user} title="Room"/>
          <Scene key="settings" component={Settings} title="Settings">
            {/*<Scene key="login" component={Login}/>*/}
            {/*<Scene key="signup" component={Signup}/>*/}
          </Scene>
        </Scene>
      </Router>
    );
  }
}
