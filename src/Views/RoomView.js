import React, {Component} from 'react';
import {
  StyleSheet,
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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {GiftedChat} from 'react-native-gifted-chat';
import YouTube from 'react-native-youtube'
import {
  Container,
  Tab,
  Header,
  Text,
  Tabs,
  Title,
  Body,
  Icon,
  List,
  Left,
  Right,
  TabHeading,
  Content,
} from 'native-base';
import app from './../app';

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    this.state = {
      messages: [],
      message: '',
      users: [],
      listViewPaddingTop: 0,
      isQueueing: false
    };
    this.setChatListener();
  }

  onSend(msg) {
    app.user.chat(msg[0].text);
    // msg = msg[0];
    // let newMessage = {
    //   _id: msg._id,
    //   text: msg.message,
    //   createdAt: Date.now(),
    //   user: {
    //     _id: app.user.user.info._id,
    //     name: app.user.user.info.username,
    //     avatar: app.user.user.info.profileImage.secure_url
    //   }
    // };
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, newMessage)
    // }));
  }

  setChatListener() {
    app.user.socket.on('message', (msg) => {
      //New messages are sent over socket
      //TODO: Need to connect to the base socket on app open
      //TODO: but only connect to the room here
      msg = JSON.parse(msg);
      switch (msg.action) {
        case 15:
          if (msg.message.name == 'chat-message') {
            msg = JSON.parse(msg.message.data);
            console.log('message:', msg);
            console.log('room info:', app.user.room);
            app.user.getRoomUser(app.user.room.info._id, msg.user._id)
              .then(user => {
                console.log(user);
                //TODO: check if images have a unique field
                //TODO: If they do, we can put images in the gifted chat message object
                let newMessage = {
                  _id: msg.chatid,
                  text: msg.message,
                  createdAt: Date.now(),
                  user: {
                    _id: msg.user._id,
                    name: user._user.username,
                    avatar: user._user.profileImage.secure_url
                  }
                };
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, newMessage)
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
    return (
      <Container>
        <Header hasTabs>
          <Body>
          <Title>{app.user.room.info.name}</Title>
          </Body>
        </Header>
        <Tabs>
          <Tab heading={<TabHeading><Icon name="ios-chatbubbles"/><Text> Chat</Text></TabHeading>}>
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend.bind(this)}
              user={{
                _id: app.user.user.info._id
              }}
            />
          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-videocam"/><Text> Video</Text></TabHeading>}>
          {this.state.isQueueing == true ?
            <Title>Loading next video...</Title> : app.user.room.info.currentSong.type == 'youtube' ?
            <YouTube
            ref="youtubePlayer"
            videoId={app.user.room.info.currentSong.fkid} // The YouTube video ID
            play={true}           // control playback of video with true/false
            hidden={false}        // control visiblity of the entire view
            playsInline={true}    // control whether the video should play inline
            loop={false}          // control whether the video should loop when ended

            onReady={(e)=>{this.setState({isReady: true})}}
            onChangeState={(e)=>{this.setState({status: e.state})}}
            onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
            onError={(e)=>{this.setState({error: e.error})}}
            onProgress={(e)=>{
              // console.log('current time:', e.currentTime, 'duration:', e.duration);
              // console.log(this.state.status);
              this.setState({currentTime: e.currentTime, duration: e.duration})
              if (e.duration <= e.currentTime + 1) {
                console.log('Video Over', app.user.room.info.currentSong.name);
                this.setState({isQueueing: true});

                //TODO this wont work if the next video isnt playing yet, when queue is implemented then
                //we might have a better solution
                app.user.updateRoom().then(() => {
                  this.setState({isQueueing: false})
                });
              }
            }}
            style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
            /> : null
          }

          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-list"/><Text> Playlists</Text></TabHeading>}>
            <Text>Queue stuff</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
