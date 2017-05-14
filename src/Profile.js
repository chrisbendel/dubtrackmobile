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

  //TODO: implement this page with followers, follow button, etc.
  //TODO: Anytime we hit this component we wanna pass in the profile user's id
  //TODO: with the users name as the title (Actions.profile({title: USERNAME});
  //TODO: EX: hitting a users avatar in chat brings you to their profile page with their id
  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.Body}>
          <Thumbnail size={80} source={{uri: this.props.avatar}}/>
          <Text style={styles.Name}>{this.props.name}</Text>
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
    justifyContent: 'center'
  },
  Name: {
    fontWeight: 'bold',
    padding: 10
  },
};
