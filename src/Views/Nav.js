import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import app from './../app';
import {Actions} from 'react-native-router-flux';

export default class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessages: 0
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

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {
            Actions.lobby();
          }}>
            <Icon size={30} name={'ios-home'}/>
          </Button>
          <Button onPress={() => {
            Actions.room();
          }}>
            <Icon size={30} name={'ios-musical-notes'}/>
          </Button>
          <Button badgeValue={this.state.newMessages} onPress={() => {
            app.user.pm.listMessages()
              .then(() => {
                Actions.messages();
              });
          }}>
            <Icon size={30} name={'ios-mail'}/>
          </Button>
          <Button onPress={() => {
            Actions.settings();
          }}>
            <Icon size={30} name={'ios-settings'}/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
