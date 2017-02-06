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
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import app from './app';
import {
  Container,
  Button,
  Header,
  Icon,
  Footer,
  FooterTab,
  Content,
  Title,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
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
      listViewPaddingTop: 0
    };
    this.setSocket = this.setSocket.bind(this);
    this.updateListViewPaddingTop = this.updateListViewPaddingTop.bind(this);
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


  updateListViewPaddingTop(listViewContentHeight) {
    this.messageList.scrollTo({y: 100});
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

  //todo figure chatbar style out
  render() {
    let that = this;
    let totalHeight = 0;
    return (
      <View style={{flex: 1}}>
        <Container>
          <Header>
            <Title>{this.props.room.name}</Title>
          </Header>
          <Content>
            <View style={{height: height * .75}}>
              <InvertibleScrollView inverted
                                    onContentSizeChange={ (contentWidth, contentHeight) => {
                                      this.messageList.scrollTo({y: 0})
                                    }}
                                    ref={(messageList) => {
                                      this.messageList = messageList
                                    }}>
                <List dataArray={this.state.messages}
                      renderRow={(message) =>
                        <ListItem
                          style={{borderBottomWidth: 0}}
                        >
                          <Thumbnail circle size={30} source={{uri: message.avatar}}/>
                          <Text style={{fontWeight: 'bold'}}>{message.user.username}</Text>
                          <Text>{message.message}</Text>
                        </ListItem>
                      }>
                </List>
              </InvertibleScrollView>
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name='ios-list'/>
              </Button>
              <Button>
                <Icon name='ios-heart'/>
              </Button>
              <Button>
                <Icon name='ios-arrow-up'/>
              </Button>
              <Button>
                <Icon name='ios-arrow-down'/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
        <View style={styles.chatContainer}>
          <TextInput
            ref={'chat'}
            style={styles.chatBar}
            autoCorrect={false}
            placeholderTextColor={'black'}
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
  chatContainer: {
    bottom: 55,
    right: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#4a8bfc',
  },
  message: {
    width: width,
    borderWidth: 1,
    borderColor: 'black'
  },
  chatBar: {
    height: 30,
    textAlign: 'center'
  },
});
