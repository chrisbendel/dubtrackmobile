GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, View, Platform, StyleSheet, Menu, Image, Navigator, TouchableHighlight} from 'react-native';

import Home from './Home';
import Room from './Room';
import DubBot from './DubBot/dub-bot';
import Settings from './Settings';
import Drawer from 'react-native-drawer'
const Gear = require('./icons/gear.png');

export default class app extends Component {
  static user = new DubBot();

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    }
  }

  closeSettings = () => {
    this.setState({drawerOpen: false});
    this._drawer.close()
  };

  openSettings = () => {
    this.setState({drawerOpen: true});
    this._drawer.open()
  };

  renderScene(route, navigator) {
    let component;
    switch (route.title) {
      case 'Home':
        component =
          <Home
            navigator={navigator}
            {...route.passProps}
            user={app.user}/>;
        break;
      case
      'Room':
        component =
          <Room
            navigator={navigator}
            {...route.passProps}
            user={app.user}/>;
        break;
      case
      'Settings':
        component =
          <Settings
            navigator={navigator}
            {...route.passProps}
            user={app.user}/>;
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
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<Settings user={app.user} closeSettings={this.closeSettings.bind(this)}/>}
        side="right"
        openDrawerOffset={35}
        panOpenMask={200}
        panCloseMask={200}>
        <TouchableHighlight
          style={styles.settingsButton}
          onPress={() => {
            !this.state.drawerOpen ? this.openSettings() : this.closeSettings();
          }}>
          <Image source={Gear}/>
        </TouchableHighlight>
        <Navigator
          initialRoute={routes[0]}
          renderScene={this.renderScene}>
        </Navigator>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  settingsButton: {
    top: 22,
    zIndex: 1,
    position: 'absolute',
    right: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
});
