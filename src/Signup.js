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

import app from './app';

//TODO: implement login with facebook, soundcloud, twitter, twitch, and email
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup Page</Text>
      </View>
    );
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
