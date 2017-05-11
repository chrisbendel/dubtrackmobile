import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import {
  Container,
  Tab,
  Header,
  Text,
  Tabs,
  Title,
  Body,
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

    this.state = {
      messages: [],
      isQueueing: false
    };
    this.setChatListener();
  }

  componentWillMount() {
    this.setState({
      roomInfo: app.user.room.info,
      roomUsers: app.user.room.users,
      // currentSong: app.user.room.info.currentSong.fkid
    })
  }

  onSend(msg) {
    app.user.chat(msg[0].text);
  }

  setChatListener() {
    app.user.socket.on('message', (msg) => {
      //TODO: Need to connect to the base socket on app open
      //TODO: but only connect to the room here
      msg = JSON.parse(msg);
      switch (msg.action) {
        case 15:
          if (msg.message.name == 'chat-message') {
            msg = JSON.parse(msg.message.data);
            app.user.getRoomUser(app.user.room.info._id, msg.user._id)
              .then(user => {
                //TODO: check if images have a unique field
                //TODO: If they do, we can put images in the gifted chat message object
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
          if (msg.message.name == 'room_playlist-update') {
            msg = JSON.parse(msg.message.data);
            console.log(msg);
          }
          break;
        case 14:

          break;
        default:
      }
    });
  }

  renderBubble(props) {
    if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble {...props}/>
      );
    }
    if (props.position == 'left') {
      return (
        <View>
          <Text>{props.currentMessage.user.name}</Text>
          <Bubble {...props}/>
        </View>
      );
    } else {
      return (
        <Bubble {...props}/>
      );
    }
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={<TabHeading><Icon name="ios-chatbubbles"/><Text> Chat</Text></TabHeading>}>
            <GiftedChat
              //TODO: implement onPressAvatar to go to profile
              //TODO: reference: https://github.com/FaridSafi/react-native-gifted-chat
              messages={this.state.messages}
              renderBubble={this.renderBubble}
              onSend={this.onSend.bind(this)}
              user={{
                _id: app.user.user.info._id
              }}
            />
          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-list"/><Text> Playlists</Text></TabHeading>}>
            <Text>Queue stuff</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
