import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";

import {
  AsyncStorage
} from 'react-native';

import {
  Container,
} from 'native-base';

import {Scene, Router, Actions} from 'react-native-router-flux';

import api from './API/api';
import Lobby from './Lobby';
import Room from './Room';
import Auth from './Auth';
import Messages from './Messages';
import Player from './Player';
import Profile from './Profile';
import PM from './Views/PrivateMessage';
import Nav from'./Views/Nav';

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
    app.user.checkNew();
    // app.user.login('dubtrackmobile', 'insecure');
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        EventEmitter.emit('connectUser', user._id);
      }
    });
  }

  refreshOnBack() {
    Actions.lobby({type: 'reset'});
  }

  render() {
    return (
      <Container style={{marginTop: 22}}>
        <Nav/>
        <Router hideNavBar={true}>
          <Scene key="root">
            <Scene key="lobby" renderBackButton={() => (null)} component={Lobby} title="Lobby"/>
            <Scene key="room" renderBackButton={() => (null)} component={Room} title="Room"/>
            <Scene key="messages" component={Messages} title="Messages"/>
            <Scene key="pm" component={PM} title="pm"/>
            <Scene key="auth" renderBackButton={() => (null)} component={Auth} title=""/>
            <Scene key="profile" component={Profile} title="Profile"/>
          </Scene>
        </Router>
        <Player/>
      </Container>
    );
  }
}
