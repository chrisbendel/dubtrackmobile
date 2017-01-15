GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, Platform, Menu, Navigator, TouchableHighlight} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
const SideMenu = require('react-native-side-menu');
var ScrollableTabView = require('react-native-scrollable-tab-view');

import Home from './Home';
import Room from './Room';
import DubAPI from './DubAPI/index';
var api = new DubAPI({username: 'dubtrackmobile', password: 'insecure'}, function (err, bot) {
  if (err) {
    console.error("Error", bot, err);
  }
  console.log('bot');
  console.log(bot);

  function connect(slug) {
    console.log(slug);
    bot.connect(slug);
  }

  bot.on('connected', function (name) {
    console.log('connected to name: ' + name);
  });

  bot.on('disconnected', function (name) {
    console.log('Disconnected from ' + name);

    setTimeout(connect, 15000);
  });

  bot.on('error', function (err) {
    console.log('error');
    console.error(err);
  });

  bot.on(bot.events.chatMessage, function (data) {
    console.log(data.user.username + ': ' + data.message);
  });

  connect('thephish');
});

export default class app extends Component {
  constructor(props) {

    super(props);
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
    const menu = <Menu navigator={navigator}/>;

    if (route.name == 'Home') {
      return (
        <Home
          navigator={navigator}
          {...route.passProps}
        />

      );
    }
    if (route.name == 'Room') {
      return (
        <Room
          navigator={navigator}
          {...route.passProps}
        />
      );
    }
  }
}
