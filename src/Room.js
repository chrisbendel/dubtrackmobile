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
import {Container, Content} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import app from './app';
import KeyboardSpacer from 'react-native-keyboard-spacer';
var EngineIOClient = require('react-native-engine.io-client');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let {height, width} = Dimensions.get('window');

export default class Room extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      messages: [],
      filteredMessages: [],
      message: '',
      users: [],
    };
    this.onSend = this.onSend.bind(this);
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

  // componentDidMount() {
  //   this.updateChat = setInterval(() => {
  //     this.setState({
  // messages: app.user.room.chat,
  // dataSource: ds.cloneWithRows(app.user.room.chat)
  // })
  // }, 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.updateChat);
  // }

  setSocket() {
    let that = this;
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        this.socket = new EngineIOClient({
          hostname: 'ws.dubtrack.fm',
          secure: true,
          path: '/ws',
          query: {access_token: json.data.token},
          transports: ['websocket']
        });


        this.socket.on('message', function (msg) {
          msg = JSON.parse(msg);
          switch (msg.action) {
            case 15:
              if (msg.message.name == 'chat-message') {
                msg = JSON.parse(msg.message.data);
                let userInfo;
                app.user.getRoomUser(that.props.room._id, msg.user._id)
                  .then(user => {
                    return that.filterMessage(msg, user.data);
                  })
                  .catch(e => {
                    console.log(e);
                    return userInfo = null;
                  });

              }
              break;
            case 14:

              break;
            default:
          }
        });
        this.socket.on('open', function () {
          console.log('socket open');
        });
        this.socket.on('close', function () {
          console.log('socket closed');
        });
        this.socket.on('error', function () {
          console.log('socket error');
        });
      })
      .then(() => {
        return this.socket.send(JSON.stringify({action: 10, channel: 'room:' + this.props.room._id}));
      })
      .catch(e => {
        console.log(e);
      });
  }

  filterMessage(msg, user) {
    console.log(msg, user);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: msg.message,
          createdAt: new Date(),
          user: {
            _id: msg.user._id,
            name: msg.user.username,
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }


  renderRow(rowData) {
    console.log(rowData);
    return (
      <View style={styles.message}>
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{rowData.user.username}</Text>
        </View>
        <Text>{rowData.message}</Text>
      </View>
    );
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    let that = this;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{_id: 1}}
      />
      // <View style={styles.container}>
      //   <Text style={styles.roomTitle}>
      //     {this.props.room.name}
      //   </Text>
      //   <ListView
      //     style={styles.chat}
      //     enableEmptySections={true}
      //     dataSource={this.state.dataSource}
      //     renderRow={this.renderRow.bind(this)}/>
      //   <TextInput
      //     ref={'chat'}
      //     style={styles.searchBar}
      //     autoCorrect={false}
      //     placeholder="Send chat message"
      //     returnKeyType='send'
      //     returnKeyLabel='send'
      //     onChangeText={(message) => this.setState({message})}
      //     onSubmitEditing={() => {
      //       app.user.chat(this.state.message);
      //       that.refs['chat'].clear();
      //       this.setState({message: ''});
      //     }}/>
      //   <KeyboardSpacer/>
      // </View>
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
