import React, {Component} from 'react';

import Player from './Player';
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import {Actions, Scene, Router, Modal, TabBar} from 'react-native-router-flux';

import api from './API/api';
import Lobby from './Lobby';
import Room from './Room';
import Profile from './Views/ProfileView';
import Messages from './Views/MessageListView';
import Nav from'./Views/Nav';

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      newMessages: 0,
      currentRoom: null,
    };

    app.user.login('dubtrackmobile', 'insecure');
    app.user.setSocket();
  }

  setRoom(room) {
    this.setState({currentRoom: room});
  }

  render() {
    return (
      <Container>
        <Router>
          <Scene key="root">
            <Scene setRoom={this.setRoom.bind(this)} key="lobby" component={Lobby} title="Lobby"/>
            <Scene key="room" backTitle="Lobby" component={Room} title=""/>
            <Scene key="messages" component={Messages} title="Messages"/>
            <Scene key="profile" component={Profile} title="Profile"/>
          </Scene>
        </Router>
        <Player room={this.state.room}/>
        <Nav/>
      </Container>
    );
  }
}
