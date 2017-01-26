import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';
import DubBot from './DubBot/dub-bot';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import app from './app';

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let loggedIn = typeof app.user.username != 'undefined';
    this.state = {
      loggedIn: loggedIn,
      username: '',
      password: '',
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <Button
            backgroundColor="#272635"
            color="#B1E5F2"
            title="Logout"
            onPress={() => {
              app.user.protocol.account.logout();
              this.setState({loggedIn: false});
              this.props.closeSettings();
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Username"
            returnKeyType='done'
            returnKeyLabel='done'
            onChangeText={(username) => this.setState({username: username})}/>
          <KeyboardSpacer/>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Password"
            returnKeyType='done'
            returnKeyLabel='done'
            onChangeText={(password) => this.setState({password: password})}/>
          <KeyboardSpacer/>
          <Button
            onPress={() => {
              app.user = new DubBot(this.state.username, this.state.password);
              this.setState({loggedIn: true});
              this.props.closeSettings();
            }}
            backgroundColor="#272635"
            color="#B1E5F2"
            title="Login">
          </Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
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
});
