GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, View, Platform, Menu, Navigator, TouchableHighlight} from 'react-native';

import Home from './Home';
import Room from './Room';
import Settings from './Settings';
import DubBot from './DubBot/dub-bot';
import SideMenu from 'react-native-side-menu';
import SettingsMenu from './Menu';

export default class app extends Component {
  static bot = new DubBot('dubtrackmobile', 'insecure');

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 'About'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen,});
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  renderScene(route, navigator) {
    const menu = <SettingsMenu onItemSelected={this.onMenuItemSelected}/>;
    let component;
    switch (route.title) {
      case 'Home':
        component =
          <SideMenu menu={menu}
                    menuPosition="right">
            <Home
              navigator={navigator}
              {...route.passProps}
              bot={app.bot}/>
          </SideMenu>;
        break;
      case
      'Room':
        component =
          <Room
            navigator={navigator}
            {...route.passProps}
            bot={app.bot}/>;
        break;
      case
      'Settings':
        component =
          <Settings
            navigator={navigator}
            {...route.passProps}
            bot={app.bot}/>;
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
        renderScene={this.renderScene}>
      </Navigator>
    );
  }
}
