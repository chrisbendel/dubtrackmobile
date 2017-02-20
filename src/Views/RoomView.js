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
import {GiftedChat} from 'react-native-gifted-chat';
import {
  Container,
  Body,
  Tab,
  Icon,
  List,
  Left,
  Right,
  TabHeading,
  Content,
} from 'native-base';
import app from './../app';

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    this.state = {
      messages: [],
      message: '',
      users: [],
      listViewPaddingTop: 0
    };
    this.setChatListener();
  }

  onSend(msg) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, msg)
    }));
  }

  setChatListener() {
    app.user.socket.on('message', (msg) => {
      //New messages are sent over socket
      //TODO: Need to connect to the base socket on app open
      //TODO: but only connect to the room here
      msg = JSON.parse(msg);
      switch (msg.action) {
        case 15:
          if (msg.message.name == 'chat-message') {
            msg = JSON.parse(msg.message.data);
            console.log(msg);
            app.user.getRoomUser(app.user.room.info._id, msg.user._id)
              .then(user => {
                console.log(user);
                let newMessage = {
                  _id: msg.chatid,
                  text: msg.message,
                  createdAt: Date.now(),
                  user: {
                    _id: msg.user._id,
                    name: user._user.username,
                    avatar: user._user.profileImage.secure_url
                  }
                };
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, newMessage)
                }));
              })
              .catch(e => {
                console.log(e);
              });
          }
          break;
        case 14:

          break;
        default:
      }
    });
  }

  render() {
    return (
      <Container>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          user={{
            _id: app.user.user.info._id,
          }}
        />
      </Container>
      // <View style={styles.chatContainer}>
      //   <TextInput
      //     ref={'chat'}
      //     style={styles.chatBar}
      //     autoCorrect={false}
      //     placeholderTextColor={'black'}
      //     placeholder="Send chat message"
      //     returnKeyType='send'
      //     returnKeyLabel='send'
      //     onChangeText={(message) => this.setState({message})}
      //     onSubmitEditing={() => {
      //       app.user.chat(this.state.message);
      //       that.refs['chat'].clear();
      //       this.setState({message: ''});
      //     }}/>
      //   <KeyboardSpacer/>
      // </View>
    );
  }
}
