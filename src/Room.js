import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';

import {
  Container,
  Body,
  Tab,
  Left,
  Right,
  TabHeading,
  Content,
} from 'native-base';
import app from './app';
import RoomView from './Views/RoomView';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      users: [],
    };
    this.title = this.props.room.name;
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    app.user.socket.close();
    // app.user.leaveRoom(this.props.room._id);
    app.user.setSocket();
  }

  render() {
    if (app.user.room) {
      return <RoomView/>
    }

    return (
      <Container>
        <Content>
          <Text>Join a room</Text>
        </Content>
      </Container>
    );
  }
}
