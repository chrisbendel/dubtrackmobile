GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator} from 'react-native';

import Home from './Home';
import Room from './Room';
import DubBot from './DubBot/dub-bot';
import Settings from './Settings';
import {Actions, Scene, Router} from 'react-native-router-flux';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new DubBot();

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      room: null
    };
    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(index, room = null) {
    this.setState({
      room: room,
      currentPage: index,
    });
  };

  render() {
    return (
      <Router sceneStyle={{backgroundColor:'#F7F7F7'}}>
        <Scene key="home" component={Home} title="Home"/>
        <Scene key="room" component={Room} title="Room"/>
        <Scene key="settings" component={Settings} title="Settings"/>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
});
