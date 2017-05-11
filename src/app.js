import React, {Component} from 'react';

import {
  Text,
} from 'react-native';

import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import {Actions, Scene, Router} from 'react-native-router-flux';

import api from './API/api';
import Lobby from './Lobby';
import Room from './Room';
import Profile from './Views/ProfileView';
import Messages from './Messages';
import Player from './Player';
import PM from './Views/PrivateMessage';
import Nav from'./Views/Nav';

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      newMessages: 0,
      song: null
    };

    app.user.login('dubtrackmobile', 'insecure');
    app.user.setSocket();
  }

  render() {
    return (
      <Container>
        <Router>
          <Scene key="root">
            <Scene key="lobby" component={Lobby} title="Lobby"/>
            <Scene key="room" backTitle="Lobby" component={Room} title="Room"/>
            <Scene key="messages" component={Messages} title="Messages"/>
            <Scene key="pm" component={PM} title="pm"/>
            <Scene key="profile" component={Profile} title="Profile"/>
          </Scene>
        </Router>
        <Player/>
        <Nav/>
      </Container>
    );
  }
}
