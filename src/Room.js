import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";

import {
  View,
  AsyncStorage,
  AlertIOS,
} from 'react-native';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import FullSpinner from './Views/FullSpinnerView';
import app from './app';

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

export default class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      mounted: false,
    };

    EventEmitter.on('chat', (msg) => {
      if (this.state.mounted) {
        app.user.getUserInfo(msg.user._id)
          .then(user => {
            let newMessage = {
              _id: msg.chatid,
              text: msg.message,
              createdAt: Date.now(),
              user: {
                _id: msg.user._id,
                name: user.username,
                avatar: user.profileImage.secure_url
              }
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, newMessage)
            }));
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        console.log('got chat but not mounted');
      }
    });
  }

  componentWillMount() {
    // AsyncStorage.getItem('chats').then((chats) => {
    //   this.setState({messages: JSON.parse(chats)});
    //   console.log(JSON.parse(chats));
    // });
    this.setState({mounted: true});
    this.setRoom(this.props.id);
    app.user.joinRoom(this.props.id);
  }

  componentWillUnmount() {
    this.setState({mounted: false});
    // AsyncStorage.setItem('chats', JSON.stringify(this.state.messages));
  }

  setRoom(room) {
    console.log(room);
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    }).then(() => {
      app.user.getRoomInfo(room).then((room) => {
        this.setState({room: room});
      }).then(() => {
        app.user.getRoomUsers(room).then((users) => {
          this.setState({users: users});
        });
      })
    });
  }

  onSend(msg) {
    app.user.chat(msg[0].text, this.state.room._id, this.state.room.realTimeChannel);
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

  renderInputToolbar() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login or Signup to chat</Text>
      </View>
    );
  }

  render() {
    if (!this.state.room) {
      return <FullSpinner/>
    }

    return (
      <Container>
        <Tabs>
          <Tab heading={<TabHeading><Icon name="ios-chatbubbles"/><Text> Chat</Text></TabHeading>}>
            {this.state.user ?
              <GiftedChat
                //TODO: implement onPressAvatar to go to profile/room moderate
                //TODO: reference: https://github.com/FaridSafi/react-native-gifted-chat
                messages={this.state.messages}
                renderBubble={this.renderBubble}
                onSend={this.onSend.bind(this)}
                bottomOffset={60}
                user={{
                  _id: this.state.user._id,
                  name: this.state.user.username,
                  avatar: this.state.user.profileImage.secure_url
                }}
              />
            :
              //For non logged in users- we don't render the input box for chat
              <GiftedChat
                messages={this.state.messages}
                renderBubble={this.renderBubble}
                renderInputToolbar={this.renderInputToolbar}
                user={{_id: 1}}
              />
            }
          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-list"/><Text> Playlists</Text></TabHeading>}>
            <Text>Queue stuff</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
