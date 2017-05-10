import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  AsyncStorage,
  Dimensions
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
      listViewPaddingTop: 0
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    app.user.socket.close();
    // app.user.leaveRoom(this.props.room._id);
    app.user.setSocket();
  }

  render() {
    return (
      <Container>
        {app.user.room ?
          <RoomView/>
          :
          <Content>
            <Text>Join a room</Text>
          </Content>
        }
      </Container>
    );
  }
}
