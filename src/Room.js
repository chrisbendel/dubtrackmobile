GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import app from './app';
import {Container, Header, Content, Title, List, ListItem, Thumbnail} from 'native-base';
var EngineIOClient = require('react-native-engine.io-client');
import KeyboardSpacer from 'react-native-keyboard-spacer';

let {height, width} = Dimensions.get('window');

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      messages: [],
      message: '',
      users: [],
    };
    this.setSocket = this.setSocket.bind(this);
  }

  componentWillMount() {
    this.setSocket();
    app.user.getRoomUsers(this.props.room._id)
      .then(users => {
        this.setState({users: users});
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    this.socket.close();
    app.user.leaveRoom(this.props.room._id);
  }

  setSocket() {
    let that = this;
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        that.socket = new EngineIOClient({
          hostname: 'ws.dubtrack.fm',
          secure: true,
          path: '/ws',
          query: {access_token: json.data.token},
          transports: ['websocket']
        });
        that.socket.on('message', function (msg) {
          msg = JSON.parse(msg);
          switch (msg.action) {
            case 15:
              if (msg.message.name == 'chat-message') {
                msg = JSON.parse(msg.message.data);
                app.user.getRoomUser(that.props.room._id, msg.user._id)
                  .then(user => {
                    msg['avatar'] = user._user.profileImage.secure_url;
                    console.log(msg);
                    return that.setState(previousState => ({
                      messages: [...previousState.messages, msg]
                    }));
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
              break;
            case 14:

              break;
            default:
          }
        });
        that.socket.on('open', function () {
          console.log('socket open');
        });
        that.socket.on('close', function () {
          console.log('socket closed');
        });
        that.socket.on('error', function () {
          console.log('socket error');
        });
      })
      .then(() => {
        return that.socket.send(JSON.stringify({action: 10, channel: 'room:' + this.props.room._id}));
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    let that = this;
    return (
      <View style={{flex: 1}}>
        <Container>
          <Header>
            <Title>{this.props.room.name}</Title>
          </Header>
          <Content>
            <List dataArray={this.state.messages}
                  renderRow={(message) =>
                    <ListItem style={{borderBottomWidth: 0}}>
                      <Thumbnail circle size={30} source={{uri: message.avatar}}/>
                      <Text style={{fontWeight: 'bold'}}>{message.user.username}</Text>
                      <Text>{message.message}</Text>
                    </ListItem>
              }>
            </List>
          </Content>
        </Container>
        <View style={styles.searchContainer}>
          <TextInput
            ref={'chat'}
            style={styles.searchBar}
            autoCorrect={false}
            placeholder="Send chat message"
            returnKeyType='send'
            returnKeyLabel='send'
            onChangeText={(message) => this.setState({message})}
            onSubmitEditing={() => {
            app.user.chat(this.state.message);
            that.refs['chat'].clear();
            this.setState({message: ''});
          }}/>
          <KeyboardSpacer/>
          <KeyboardSpacer/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6A6A8',
  },
  roomTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  message: {
    width: width,
    borderWidth: 1,
    borderColor: 'black'
  },
  searchBar: {
    height: 30,
    borderColor: 'black',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    margin: 10,
  },
});
