GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator, Image} from 'react-native';

import Home from './Home';
import Room from './Room';
import Client from './DubBot/client';
import Settings from './Settings';
import {Actions, Scene, Router} from 'react-native-router-flux';
import {Drawer} from 'native-base';
import SideBar from './sidebar';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new Client();

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Drawer
        side="left"
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        negotiatePan
      >
        <Router sceneStyle={{backgroundColor:'#F7F7F7'}}>
          <Scene key="root" hideNavBar={true}>
            <Scene key="home"
                   initial
                   component={Home}
                   title="Home"/>
            {/*<Scene key="drawer" component={} title="Drawer"/>*/}
            <Scene key="room" component={Room} user={app.user} title="Room"/>
            <Scene key="settings" component={Settings} title="Settings">
              {/*<Scene key="login" component={Login}/>*/}
              {/*<Scene key="signup" component={Signup}/>*/}
            </Scene>
          </Scene>
        </Router>
      </Drawer>
    );
  }
}
