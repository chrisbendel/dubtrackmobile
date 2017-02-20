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
    console.log('user');
    console.log(app.user);
    console.log('props');
    console.log(this.props);
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

  // setChatListener() {
  //   app.user.socket.on('message', (msg) => {
  //     //New messages are sent over socket
  //     //TODO: Need to connect to the base socket on app open
  //     //TODO: but only connect to the room here
  //     msg = JSON.parse(msg);
  //     switch (msg.action) {
  //       case 15:
  //         console.log(msg);
  //         if (msg.message.name == 'chat-message') {
  //           msg = JSON.parse(msg.message.data);
  //           app.user.getRoomUser(this.props.room._id, msg.user._id)
  //             .then(user => {
  //               msg['avatar'] = user._user.profileImage.secure_url;
  //               return this.setState(previousState => ({
  //                 messages: [...previousState.messages, msg]
  //               }));
  //             })
  //             .catch(e => {
  //               console.log(e);
  //             });
  //         }
  //         break;
  //       case 14:
  //
  //         break;
  //       default:
  //     }
  //   });
  // }

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
