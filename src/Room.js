import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";

import {
  View,
  AsyncStorage,
  AlertIOS,
  Dimensions
} from 'react-native';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import FullSpinner from './Views/FullSpinnerView';
import app from './app';
import Player from './Player';
import {
  Container,
  Tab,
  Header,
  Text,
  Tabs,
  Title,
  Thumbnail,
  Body,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  TabHeading,
  Content,
} from 'native-base';
const {height, width} = Dimensions.get('window');
export default class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      mounted: false,
      room: null
    };

    EventEmitter.on('roomJoin', (room) => {
      this.setRoom(room);
    });

    //Maybe add notification sound if message contains current user's name with an @
    EventEmitter.on('chat', (msg) => {
      if (this.state.mounted) {
        app.user.getUserInfo(msg.user._id)
          .then(user => {
            let newMessage = {
              _id: msg.chatid,
              text: msg.message,
              createdAt: Date.now(),
              user: {
                _id: msg.user._id,
                name: user.username,
                avatar: user.profileImage.secure_url
              }
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, newMessage)
            }));
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        console.log('got chat but not mounted');
      }
    });
  }

  componentWillMount() {
    if (this.props.room) {
      this.setRoom(this.props.room);
    } else {
      AsyncStorage.getItem('currentRoom').then((room) => {
        console.log(room);
        console.log(JSON.parse(room));
        // this.setRoom(JSON.parse(room));
      });
    }
    this.setState({mounted: true});
    // AsyncStorage.getItem('chats').then((chats) => {
    //   this.setState({messages: JSON.parse(chats)});
    //   console.log(JSON.parse(chats));
    // });
  }

  componentWillUnmount() {
    // console.log('hi');
    // console.log(this.state.room);
    // console.log(JSON.stringify(this.state.room));
    // AsyncStorage.setItem('currentRoom', JSON.stringify(this.state.room))
    // .then(() => {
    //   this.setState({mounted: false});
    // });
    // AsyncStorage.setItem('chats', JSON.stringify(this.state.messages));
  }

  setRoom(room) {
    AsyncStorage.getItem('user')
    .then((user) => {
      this.setState({user: JSON.parse(user)});
    })
    .then(() => {
      AsyncStorage.setItem('currentRoom', JSON.stringify(this.state.room))
      .then(() => {
        this.setState({mounted: false});
      });
    })
    .then(() => {
      app.user.getRoomUsers(room._id).then((users) => {
        this.setState({users: users, room: room});
      });
    });
  }

  onSend(msg) {
    app.user.chat(msg[0].text, this.state.room._id, this.state.room.realTimeChannel);
  }

  renderBubble(props) {
    if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble {...props}/>
      );
    }
    
    if (props.position == 'left') {
      return (
        <View>
          <Text>{props.currentMessage.user.name}</Text>
          <Bubble {...props}/>
        </View>
      );
    } else {
      return (
        <Bubble {...props}/>
      );
    }
  }

  renderInputToolbar() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login or Signup to chat</Text>
      </View>
    );
  }

  //Avatar onpress can go to user profile
  renderRow(rowData) {
    console.log(rowData);
    let user = rowData._user;
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail source={{uri: user.profileImage.secure_url}}/>
        </Left>
        <Body>
        <Text>{user.username}</Text>
        </Body>
        <Right>
          <Text note>{rowData.dubs} Dubs</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    if (!this.state.room) {
      return <FullSpinner/>
    }

    return (
      <Tabs>
        <Tab heading={<TabHeading><Icon name="ios-chatbubbles"/><Text> Chat</Text></TabHeading>}>
          {this.state.user ?
            <GiftedChat
              //TODO: implement onPressAvatar to go to profile/room moderate
              //TODO: reference: https://github.com/FaridSafi/react-native-gifted-chat
              messages={this.state.messages}
              renderBubble={this.renderBubble}
              onSend={this.onSend.bind(this)}
              bottomOffset={80}
              user={{
                _id: this.state.user._id,
                name: this.state.user.username,
                avatar: this.state.user.profileImage.secure_url
              }}
            />
            :
            //For non logged in users- we don't render the input box for chat
            <GiftedChat
              messages={this.state.messages}
              renderBubble={this.renderBubble}
              renderInputToolbar={this.renderInputToolbar}
              user={{_id: 1}}
            />
          }
        </Tab>
        <Tab heading={<TabHeading><Icon name="ios-people"/><Text> Users</Text></TabHeading>}>
          <List
            enableEmptySections={true}
            dataArray={this.state.users}
            renderRow={this.renderRow.bind(this)}/>
        </Tab>
        <Tab heading={<TabHeading><Icon name="ios-list"/><Text> Playlists</Text></TabHeading>}>

          <Text>Queue stuff</Text>
        </Tab>
        <Tab heading={<TabHeading><Icon name="ios-albums"/><Text> Queue</Text></TabHeading>}>
          <Text>Queue stuff</Text>
        </Tab>
      </Tabs>
    );
  }
}
