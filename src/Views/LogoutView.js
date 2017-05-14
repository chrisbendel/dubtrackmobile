import React, {Component} from 'react';
import {
  Text,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import {Container, Body, Button, Content, Thumbnail} from 'native-base';
import app from '../app';

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.Body}>
          <Thumbnail size={80} source={{uri: this.props.avatar}}/>
          <Text style={styles.Name}>{this.props.name}</Text>
          <Button block bordered onPress={() => {
            this.props.loading();
            app.user.logout().then(() => {
              this.props.auth();
            });
          }}>
            <Text>Logout</Text>
          </Button>
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
    justifyContent: 'center'
  },

  Logout: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Name: {
    fontWeight: 'bold',
    padding: 10
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
};
