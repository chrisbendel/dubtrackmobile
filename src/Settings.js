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
  TextInput,
  Modal
} from 'react-native';
import DubBot from './DubBot/dub-bot';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import app from './app';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log('user');
    console.log(app.user);
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Username </Text>
        <TextInput
          style={styles.form}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Username"
          returnKeyType='done'
          returnKeyLabel='done'
          onChangeText={(username) => this.setState({username: username})}/>
        <KeyboardSpacer/>
        <Text> Password </Text>
        <TextInput
          style={styles.form}
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          returnKeyType='done'
          returnKeyLabel='done'
          onChangeText={(password) => this.setState({password: password})}/>
        <KeyboardSpacer/>
        <View style={styles.button}>
          <Button
            onPress={() => {
              app.user = new DubBot(this.state.username, this.state.password);
            }}
            title="Login">
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    height: 30,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    padding: 25,
    borderWidth: 1,
    borderColor: '#272635',
    backgroundColor: '#B1E5F2'
  }
});
