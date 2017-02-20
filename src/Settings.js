import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  // Button,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Drawer} from 'native-base';
import {Actions} from 'react-native-router-flux'
import {Container, Header, Title, Left, Right, Body, Button, Footer, FooterTab, Icon, Content} from 'native-base';
import app from './app';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);

    this.state = {
      loggedIn: false,
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    if (app.user) {
      this.setState({loggedIn: true})
    }
  }

  render() {
    return(
      <Container style={styles.container}>
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Header</Title>
            </Body>
            <Right />
        </Header>

        <Content>
            <Button bordered onPress={() => {
              console.log('pressed!')
                // app.user.protocol.account.logout();
                // this.setState({loggedIn: false});
              }}>
              <Text>Logout</Text>
            </Button>
        </Content>
      </Container>
    );
    // return (
      // <View style={styles.container}>
      //   <Button
      //     backgroundColor="#272635"
      //     color="#B1E5F2"
      //     title="Logout"
      //     onPress={() => {
      //         app.user.protocol.account.logout();
      //         this.setState({loggedIn: false});
      //       }}
      //   />
      // </View>
    // );
    // return (
    //   <View style={styles.container}>
    //     <TextInput
    //       style={styles.input}
    //       autoCorrect={false}
    //       autoCapitalize="none"
    //       placeholder="Username"
    //       returnKeyType='done'
    //       returnKeyLabel='done'
    //       onChangeText={(username) => this.setState({username: username})}/>
    //     <TextInput
    //       style={styles.input}
    //       autoCorrect={false}
    //       secureTextEntry={true}
    //       autoCapitalize="none"
    //       placeholder="Password"
    //       returnKeyType='done'
    //       returnKeyLabel='done'
    //       onChangeText={(password) => this.setState({password: password})}/>
    //     <Button
    //       onPress={() => {
    //         this.setState({loggedIn: true});
    //       }}
    //       backgroundColor="#272635"
    //       color="#B1E5F2"
    //       title="Login">
    //     </Button>
    //   </View>
    // );
  }
}

const styles = {
  container: {
    flex: 1,
    // marginTop: 22,
    // alignItems: 'center',
    // justifyContent: 'center',
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
