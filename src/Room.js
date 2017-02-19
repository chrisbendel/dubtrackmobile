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
  Body,
  Tab,
  Tabs,
  TabHeading,
  Footer,
  FooterTab,
  Content,
  Title,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let {height, width} = Dimensions.get('window');
export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      users: [],
      listViewPaddingTop: 0
    };
    this.setChatListener();
  }

  componentWillMount() {
    // app.user.getRoomUsers(this.props.room._id)
    //   .then(users => {
    //     this.setState({users: users});
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  componentWillUnmount() {
    app.user.socket.close();
    app.user.leaveRoom(this.props.room._id);
  }

  setChatListener() {
    // app.user.socket.on('message', function (msg) {
    app.user.socket.on('message', (msg) => {
      //New messages are sent over socket
      //TODO: Need to connect to the base socket on app open
      //TODO: but only connect to the room here
      msg = JSON.parse(msg);
      console.log(msg);
      switch (msg.action) {
        case 15:
          if (msg.message.name == 'chat-message') {
            msg = JSON.parse(msg.message.data);
            app.user.getRoomUser(this.props.room._id, msg.user._id)
              .then(user => {
                msg['avatar'] = user._user.profileImage.secure_url;
                console.log(msg);
                return this.setState(previousState => ({
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
  }

  render() {
    let that = this;
    return (
      <View style={{flex: 1}}>
        <Container>
          <Header hasTabs>

          </Header>
          <Content>
            <View style={{height: height * .7}}>
              <InvertibleScrollView inverted
                                    onContentSizeChange={ () => {
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
