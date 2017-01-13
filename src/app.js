GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, Platform, Navigator, TouchableHighlight} from 'react-native';

import Home from './Home';
import Room from './Room';
import DubAPI from './DubAPI/index';

var api = new DubAPI({username: 'dubtrackmobile', password: 'insecure'}, function (err, bot) {
  if (err)
    return console.error("Error", bot, err);

  function connect() {
    bot.connect('thephish');
  }

  alert(bot);
  bot.on('connected', function (name) {
    console.log('connected to name: ' + name);
  });

  bot.on('disconnected', function (name) {
    console.log('Disconnected from ' + name);

    setTimeout(connect, 15000);
  });

  bot.on('error', function (err) {
    console.error(err);
  });

  bot.on(bot.events.chatMessage, function (data) {
    console.log(data.user.username + ': ' + data.message);
  });

  connect();
});

export default class app extends Component {
  constructor(props) {
    super(props);
    api.connect('thephish');
    console.log(api);
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
