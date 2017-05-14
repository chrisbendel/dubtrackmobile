import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";
import {
  Text,
  View,
  Dimensions,
  AsyncStorage
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
    this.user();

    EventEmitter.on('auth', () => {
      this.user();
    });
  }

  user() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    })
  }

  checkNewPms() {
    app.user.checkNew()
      .then(count => {
        this.setState({
          newMessages: count,
        })
      })
  }

  //TODO: put a badge on messages with current new message count
  render() {
    let user = this.state.user;
    return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {
            Actions.lobby();
          }}>
            <Icon name="ios-menu"/>
          </Button>
          <Button onPress={() => {
            Actions.room();
          }}>
            <Icon name="ios-chatbubbles"/>
          </Button>
          {user ?
            <Button onPress={() => {
              Actions.messages();
            }}>
              <Icon name="ios-mail"/>
            </Button>
            :
            null
          }

          <Button onPress={() => {
            Actions.auth({title: user ? "Logout" : "Login or Signup"});
          }}>
            <Icon name={user ? "ios-log-out" : "ios-log-in"}/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
