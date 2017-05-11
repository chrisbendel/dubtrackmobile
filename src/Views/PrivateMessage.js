import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Container,
  Header,
  Content,
} from 'native-base';

import app from '../app';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

export default class PrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    // this.onSend = this.onSend.bind(this);

    app.user.socket.on('message', (msg) => {
      msg = JSON.parse(msg);
      console.log(msg);
    })
  }

  componentWillMount() {
    let that = this;
    console.log(this.props.data);
    app.user.pm.getConversation(this.props.data._id)
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
    return (
      <Container style={{flex: 1}}>
        <Header/>
        <GiftedChat
          messages={this.state.messages}
          renderBubble={this.renderBubble}
          onSend={this.onSend.bind(this)}
          user={{
            _id: app.user.user.info._id
          }}
        />
      </Container>
    );
  }
}
