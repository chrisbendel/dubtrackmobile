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

import api from './API/api';
import Home from './Home';
import Room from './Room';
import Settings from './Views/SettingsView';
import Messages from './MessageView';
import Spinner from 'react-native-loading-spinner-overlay';

//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      currentRoom: 'home',
      loading: false
    };
    this.showPage = this.showPage.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);
    app.user.login('dubtrackmobile', 'insecure');
    app.user.setSocket();
  }

  showPage(title) {
    if (!(this.state.currentRoom == title)) {
      this.setState({
        currentRoom: title,
      });
    }
  }

  toggleSpinner() {
    this.setState({
      loading: !this.state.loading
    });
  }

  render() {
    return (
      <Container>
        <Spinner overlayColor='rgba(0,0,0,0.2)' color="#4a8bfc" visible={this.state.loading}/>
        {this.state.currentRoom == 'home' ?
          <Home showPage={this.showPage} toggleSpinner={this.toggleSpinner}/> : null
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
