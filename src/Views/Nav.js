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
  Badge,
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
      room: null,
    };

    this.checkNewPms();
    this.user();

    EventEmitter.on('roomJoin', (room) => {
      this.setState({room: room});
    })

    EventEmitter.on('auth', () => {
      this.user();
    });

    EventEmitter.on('pm', () => {
      this.checkNewPms();
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
      });
  }

  //TODO: put a badge on messages with current new message count
  render() {
    let user = this.state.user;
    let room = this.state.room;
    return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {
            Actions.lobby();
          }}>
            <Icon name="ios-menu"/>
            <Text>Lobby</Text>
          </Button>

          {room ?
            <Button onPress={() => {
              AsyncStorage.getItem('currentRoom').then((room) => {
                  Actions.room({room: room});
              });
            }}>
              <Icon name="ios-chatbubbles"/>
              <Text>Chat</Text>
            </Button>
            :
            null
          }

          {user ?
            <Button badgeValue={this.state.newMessages} onPress={() => {
              this.setState({newMessages: 0});
              Actions.messages();
            }}>
              <Icon name="ios-mail"/>
              <Text>PM</Text>
            </Button>
            :
            null
          }

          <Button onPress={() => {
            Actions.auth({title: user ? "Logout" : "Login or Signup"});
          }}>
            <Icon name={user ? "ios-log-out" : "ios-log-in"}/>
            <Text>{user ? "Logout" : "Login"}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
