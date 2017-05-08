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
      isQueueing: false
    };
    this.setChatListener();
    app.user.room.queue.currentSong(app.user.room.info._id).then(data => {
      console.log(data);
    });
  }

  componentWillMount() {
    this.setState({
      roomInfo: app.user.room.info,
      roomUsers: app.user.room.users,
      currentSong: app.user.room.info.currentSong.fkid
    })
  }

  onSend(msg) {
    app.user.chat(msg[0].text);
  }

  setChatListener() {
    app.user.socket.on('message', (msg) => {
      //TODO: Need to connect to the base socket on app open
      //TODO: but only connect to the room here
      msg = JSON.parse(msg);
      console.log(msg);
      switch (msg.action) {
        case 15:
          if (msg.message.name == 'chat-message') {
            msg = JSON.parse(msg.message.data);
            app.user.getRoomUser(app.user.room.info._id, msg.user._id)
              .then(user => {
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
          if (msg.message.name == 'room_playlist-update') {
            msg = JSON.parse(msg.message.data);
            console.log(msg);
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
          <Title>{this.state.roomInfo.name}</Title>
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
            {this.state.currentSong ?
              <YouTube
                ref="youtubePlayer"
                videoId={this.state.currentSong}
                play={true}
                hidden={false}
                playsInline={true}
                loop={false}
                showinfo={false}
                apiKey={'AIzaSyBkJJ0ZoT8XbBDYpZ8sVr1OkVev4C5poWI'}
                origin={'https://www.youtube.com'}

                onReady={(e)=> {
                  this.setState({isReady: true})
                }}
                onChangeState={(e)=> {
                  this.setState({status: e.state})
                }}
                onChangeQuality={(e)=> {
                  this.setState({quality: e.quality})
                }}
                onError={(e)=> {
                  this.setState({error: e.error})
                }}
                onProgress={(e)=> {
                  this.setState({currentTime: e.currentTime, duration: e.duration});
                  if (e.duration <= e.currentTime + 1) {
                    this.setState({isQueueing: true});

                    //TODO this wont work if the next video isnt playing yet, when queue is implemented then
                    //we might have a better solution
                    app.user.updateRoom().then(() => {
                      this.setState({isQueueing: false})
                    });
                  }
                }}
                style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
              /> : <Text>Nobody is playing right now!</Text>
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
