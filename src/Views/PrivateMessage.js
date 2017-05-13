import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import {
  Container,
  Header,
  Content,
} from 'native-base';

import app from '../app';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import FullSpinner from './FullSpinnerView';

export default class PrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    // this.onSend = this.onSend.bind(this);

    EventEmitter.on('pm', (pm) => {
      console.log(pm);
    });
  }

  getMessages() {
    let that = this;
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    }).then(() => {
      app.user.getConversation(this.props.data._id)
        .then(messages => {
          messages.data.forEach(function (msg) {
            console.log(msg);
            let newMessage = {
              _id: msg._id,
              text: msg.message,
              createdAt: msg.created,
              user: {
                _id: msg._user._id,
                name: msg._user.username,
                avatar: msg._user.profileImage.secure_url
              }
            };
            that.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, newMessage)
            }));
          });
        })
    });
  }

  componentWillMount() {
    console.log(this.props.data);
    this.getMessages();
  }

  onSend(msg) {
    console.log(msg);
    app.user.pm.send(this.props.data._id, msg[0].text);
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
    if (!this.state.user) {
      return <FullSpinner/>
    }

    return (
      <Container style={{flex: 1}}>
        <Header/>
        <GiftedChat
          messages={this.state.messages}
          renderBubble={this.renderBubble}
          onSend={this.onSend.bind(this)}
          user={{
            _id: this.state.user._id
          }}
        />
      </Container>
    );
  }
}
