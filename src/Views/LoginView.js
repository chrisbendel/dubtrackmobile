import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  // Button,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Drawer} from 'native-base';
import {Actions} from 'react-native-router-flux'
import {Container, Header, Title, Left, Right, Body, Button, Footer, FooterTab, Icon, Content, Thumbnail, Form, Item, Input} from 'native-base';
import app from '../app';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }


  render() {
    return(
      <Container>
        <Content>
          <Body style={styles.Body}>
            <Form style={styles.Form}>
              <Item style={styles.Box}>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='done'
                returnKeyLabel='done'
                onChangeText={(username) => this.setState({username})}
                style={styles.pholder}
                placeholder="Username" />
              </Item>
              <Item last style={styles.Box}>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='done'
                returnKeyLabel='done'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                style={styles.pholder}
                placeholder="Password" />
              </Item>
              <Button block bordered onPress={() => {
                console.log('pressed!!')
                app.user.login(this.state.username, this.state.password);
                this.props.updateUser();
                }}>
                <Text>Login</Text>
              </Button>
            </Form>
          </Body>
        </Content>
      </Container>
    );
  }
}
const {height: screenHeight} = Dimensions.get('window');
const styles = {
  Body: {
    flex: 1,
    height: screenHeight,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  Form: {
    width: 200
  },

  Box: {
    // justifyContent: 'center',
    alignItems: 'center',
  },

  Name: {
    fontWeight: 'bold',
    // justifyContent: 'center',
    // textAlign: 'center'
  },

  pholder: {
    textAlign: 'center'

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
