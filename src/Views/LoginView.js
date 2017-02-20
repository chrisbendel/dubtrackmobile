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
    // console.log(app.user);
    console.log('MADE IT');
  }


  render() {
    return(
      <Container>
        <Content>
          <Form style={styles.Body}>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
          {
            // <TextInput
            // style={styles.input}
            // autoCorrect={false}
            // autoCapitalize="none"
            // placeholder="Username"
            // returnKeyType='done'
            // returnKeyLabel='done'
            // onChangeText={(username) => this.setState({username: username})}/>
            // <TextInput
            // style={styles.input}
            // autoCorrect={false}
            // secureTextEntry={true}
            // autoCapitalize="none"
            // placeholder="Password"
            // returnKeyType='done'
            // returnKeyLabel='done'
            // onChangeText={(password) => this.setState({password: password})}/>

          }
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
