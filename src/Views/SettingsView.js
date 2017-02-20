import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// import {Drawer} from 'native-base';
// import {Actions} from 'react-native-router-flux'
import Logout from './LogoutView';
import Login from './LoginView';
import {Container, Header, Title, Left, Right, Body, Button, Footer, FooterTab, Icon, Content, Thumbnail} from 'native-base';
import app from '../app';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    // console.log(app.user.user.info.profileImage.url);

    this.state = {
      loggedIn: false
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(e) {
    //called by child to update the state
    e && e.preventDefault();
    if (app.user.user) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }
  }

  componentWillMount() {
    if (app.user.user) {
      this.setState({loggedIn: true})
    }
  }

  render() {
    return (
    <Container>
      {app.user.user ?
        <Logout updateUser = {this.updateUser} /> :
        <Login updateUser = {this.updateUser} />
      }
      </Container>
    );
  }
}

const styles = {
  Body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  Logout: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Name: {
    fontWeight: 'bold',
    // justifyContent: 'center',
    // textAlign: 'center'

  },
  input: {
    height: 30,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10,
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent'
  },
}
