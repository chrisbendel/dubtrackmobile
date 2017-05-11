import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';

import {
  Container,
  Footer,
  Content,
  FooterTab,
  Button,
  Icon,
  Fab,
} from 'native-base';

import ActionButton from 'react-native-action-button';

import app from './../app';
import {Actions} from 'react-native-router-flux';

let {height, width} = Dimensions.get('window');

export default class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessages: 0,
      active: false,
    };

    this.checkNewPms();
  }

  checkNewPms() {
    app.user.pm.checkNew()
      .then(count => {
        this.setState({
          newMessages: count,
        })
      })
  }

  //TODO: put a badge on messages with current new message count
  render() {
    return (
      <ActionButton
        icon={<Icon name="md-menu"/>}
        offsetY={0}
        position="center"
        degrees={90}
        buttonColor="#9b59b6"
      >
        <ActionButton.Item title="Lobby" onPress={() => {
          Actions.lobby();
        }}>
          <Icon name="ios-home"/>
        </ActionButton.Item>
        <ActionButton.Item title="Room" onPress={() => {
          Actions.room();
        }}>
          <Icon name="ios-musical-note"/>
        </ActionButton.Item>
        <ActionButton.Item title="Messages" onPress={() => {
          Actions.messages();
        }}>
          <Icon name="ios-mail"/>
        </ActionButton.Item>
        <ActionButton.Item title="Profile" onPress={() => {
          Actions.profile();
        }}>
          <Icon name="md-person"/>
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
