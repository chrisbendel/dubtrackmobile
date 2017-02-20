import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Content,
} from 'native-base';

import app from '../app';
import GiftedChat from 'react-native-gifted-chat';

//TODO This is just from example in docs
//TODO https://github.com/FaridSafi/react-native-gifted-chat
//TODO Need to work this out with sending/receiving private messages and incorporate that to gifted chat
// figure out how to get modals working with gifted chat (its a bug kinda)
export default class MessageView extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <View>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
        _id: 1
      }}/>
      </View>

    );
  }
}
