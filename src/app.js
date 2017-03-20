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
import Messages from './Views/MessageListView';
import Spinner from 'react-native-loading-spinner-overlay';

//TODO: use store to save user's login credentials/session
import store from 'react-native-simple-store';

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home',
      newMessages: 0,
      loading: false
    };
    this.showPage = this.showPage.bind(this);
    this.getActivePage = this.getActivePage.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);
    app.user.login('dubtrackmobile', 'insecure');
    app.user.setSocket();
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

  showPage(title) {
    if (!(this.state.currentPage == title)) {
      this.setState({
        currentPage: title,
      });
    }
  }

  getActivePage(title) {
    return title == this.state.currentPage;
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
        {this.state.currentPage == 'home' ?
          <Home showPage={this.showPage} toggleSpinner={this.toggleSpinner}/> : null
        }
        {this.state.currentPage == 'room' ?
          <Room /> : null
        }
        {this.state.currentPage == 'messages' ?
          <Messages /> : null
        }
        {this.state.currentPage == 'settings' ?
          <Settings /> : null
        }
        <Footer>
          <FooterTab>
            <Button active={this.getActivePage('home')} onPress={() => {
              this.showPage('home');
            }}>
              <Icon size={30} name={'ios-home'}/>
            </Button>
            <Button active={this.getActivePage('room')} onPress={() => {
              this.showPage('room');
            }}>
              <Icon size={30} name={'ios-musical-notes'}/>
            </Button>
            <Button active={this.getActivePage('messages')} badgeValue={this.state.newMessages} onPress={() => {
              this.toggleSpinner();
              app.user.pm.listMessages()
                .then(() => {
                  this.toggleSpinner();
                  this.showPage('messages');
                });
            }}>
              <Icon size={30} name={'ios-mail'}/>
            </Button>
            <Button active={this.getActivePage('settings')} onPress={() => {
              this.showPage('settings');
            }}>
              <Icon size={30} name={'ios-settings'}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
