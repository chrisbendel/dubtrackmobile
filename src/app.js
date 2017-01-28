GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator} from 'react-native';

import Home from './Home';
import Room from './Room';
import DubBot from './DubBot/dub-bot';
import Settings from './Settings';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new DubBot();

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      currentRoom: {},
    };
    this.goToPage = this.goToPage.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
  }

  updateRoom(room) {
    this.setState({
      currentRoom: room,
    });
  }

  goToPage(index) {
    this.setState({
      currentPage: index,
    });
  };

  render() {
    return (
      <ScrollableTabView style={styles.container} page={this.state.currentPage}>
        <Home tabLabel="Home" user={this.user} goToPage={this.goToPage} updateRoom={this.updateRoom}/>
        <Room tabLabel="Current Room" user={this.user} room={this.state.currentRoom}/>
        <Settings tabLabel="Settings" user={this.user} goToPage={this.goToPage}/>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
});
