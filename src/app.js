GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {View, StyleSheet, Navigator, Image, Text} from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Footer,
  FooterTab,
  Body,
  Button,
  Icon,
  Content
} from 'native-base';

import Client from './DubBot/client';
import Home from './Home';
import Room from './Room';
import Settings from './Settings';
import Messages from './MessageView';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Menu from './Menu';
//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new Client();

  constructor(props) {
    super(props);
    this.views = ['home', 'room', 'settings', 'messages'];
    this.state = {
      currentRoom: 'home',
    };
    this.showPage = this.showPage.bind(this);
  }

  componentDidUpdate() {
  }

  showPage(title) {
    if (!(this.state.currentRoom == title)) {
      this.setState({
        currentRoom: title,
      });
    }
  }

  render() {
    return (
      <Container>
        {this.state.currentRoom == 'home' ?
          <Home showPage={this.showPage}/> : null
        }
        {this.state.currentRoom == 'room' ?
          <Room /> : null
        }
        {this.state.currentRoom == 'settings' ?
          <Settings /> : null
        }
        {this.state.currentRoom == 'messages' ?
          <Messages /> : null
        }
        <Footer>
          <FooterTab>
            <Button onPress={() => {
              this.showPage('home');
            }}>
              <Icon size={30} name={'ios-home'}/>
            </Button>
            <Button onPress={() => {
              this.showPage('room');
            }}>
              <Icon size={30} name={'ios-musical-notes'}/>
            </Button>
            <Button onPress={() => {
              this.showPage('settings');
            }}>
              <Icon size={30} name={'ios-settings'}/>
            </Button>
            <Button badgeValue={1} onPress={() => {
              this.showPage('messages');
            }}>
              <Icon size={30} name={'ios-mail'}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
