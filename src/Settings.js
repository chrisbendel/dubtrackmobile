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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import app from './app';

export default class Settings extends Component {
  constructor(props) {
    super(props);
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
          <TextInput
            style={styles.input}
            autoCorrect={false}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Password"
            returnKeyType='done'
            returnKeyLabel='done'
            onChangeText={(password) => this.setState({password: password})}/>
          <Button
            onPress={() => {
              this.setState({loggedIn: true});
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
