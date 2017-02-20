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
import {Container, Header, Title, Left, Right, Body, Button, Footer, FooterTab, Icon, Content, Thumbnail, Spinner} from 'native-base';
import app from '../app';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    // console.log(app.user.user.info.profileImage.url);

    this.state = {
      imageLoaded: false
    }
  }

  componentWillMount() {
    if (app.user.user.info.profileImage) {
      // console.log(app.user.user.info.profileImage);
      this.setState({imageLoaded: true})
    } else {
      this.interval = setInterval(() => {
        if (app.user.user.info.profileImage) {
          this.setState({ imageLoaded: true});
          console.log('checking');
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    //make sure the interval is killed
    clearInterval(this.interval);
  }

  render() {

    return(
      <Container>
        <Content>
          <Body style={styles.Body}>
            {this.state.imageLoaded ? <Thumbnail size={80} source={{uri: app.user.user.info.profileImage.secure_url}} /> :
              <Spinner color='#CECECE'/>
            }
            <Text style={styles.Name}>{app.user.user.info.username}</Text>
            <Button block bordered onPress={() => {
              console.log('pressed!!')
                app.user.logout();
                app.user.user = null;
                this.props.updateUser();
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
}