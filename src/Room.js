GLOBAL = require('../src/Globals');

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
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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

let {height, width} = Dimensions.get('window');
export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      users: [],
      listViewPaddingTop: 0
    };
    // this.setChatListener();
  }

  componentWillMount() {
    // app.user.getRoomUsers(this.props.room._id)
    //   .then(users => {
    //     this.setState({users: users});
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  componentWillUnmount() {
    app.user.socket.close();
    // app.user.leaveRoom(this.props.room._id);
    app.user.setSocket();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {app.user.room ?
          <RoomView/>
          :
          <Text>Join a room</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6A6A8',
  },
  roomTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  chatContainer: {
    bottom: 55,
    right: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#4a8bfc',
  },
  message: {
    width: width,
    borderWidth: 1,
    borderColor: 'black'
  },
  chatBar: {
    height: 30,
    textAlign: 'center'
  },
});
