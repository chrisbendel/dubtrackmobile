import React, {Component} from 'react';

import {
  Text,
  AsyncStorage
} from 'react-native';

import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
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

    // app.user.login('dubtrackmobile', 'insecure');
  }

  refreshOnBack() {
    Actions.lobby({type: 'reset'});
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
            <Scene key="auth" backTitle='Lobby' onBack={this.refreshOnBack} component={Auth} title=""/>
            <Scene key="profile" component={Profile} title="Profile"/>
          </Scene>
        </Router>
        <Player/>
        <Nav/>
      </Container>
    );
  }
}
