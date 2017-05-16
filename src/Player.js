import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from 'native-base';
import {AsyncStorage, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import YouTube from 'react-native-youtube'
import app from './app';
import Socket from './API/socket';

export default class Player extends Component {
  constructor(props) {
    super(props);

    let socket;

    AsyncStorage.getItem('user').then((user) => {
      user = JSON.parse(user);
      socket = new Socket(user._id);

      EventEmitter.on('connectUser', (id) => {
        socket.connectUser(id);
      });

      EventEmitter.on('userAuth', (user) => {
        this.setState({user: user});
      });

      EventEmitter.on('newSong', (song) => {
        console.log(song);
        this.setState({song: song, playing: true});
      });

      EventEmitter.on('room', (room) => {
        socket.join(room._id);
        if (room.currentSong) {
          this.setState({playing: true, room: room});
          this.getSongTime(room);
        } else {
          this.setState({playing: false, room: room});
        }
      });
    });

    this.state = {
      room: null,
      song: null,
    };
  }

  getSongTime(room) {
    app.user.currentSong(room._id).then(song => {
      this.setState({song: song.data, room: room, playing: true});
    });
  }

  render() {
    let playing = this.state.playing;
    let song = this.state.song;
    let room = this.state.room;
    if (room) {
      return (
        <View style={styles.playerContainer}>
          {song ?
            <YouTube
              ref="youtubePlayer"
              videoId={song.songInfo.fkid}
              play={playing}
              hidden={false}
              playsInline={true}
              showinfo={false}
              apiKey={'AIzaSyBkJJ0ZoT8XbBDYpZ8sVr1OkVev4C5poWI'}
              origin={'https://www.youtube.com'}

              onChangeState={(e) => {
                console.log(e);
                this.refs.youtubePlayer.seekTo(song.startTime);
              }}

              onReady={(e) => {
                this.refs.youtubePlayer.seekTo(song.startTime);
                this.setState({isReady: true})
              }}

              style={styles.player}/>
            : null }
          <View style={styles.info}>
            <Text style={{fontSize: 11, fontWeight: 'bold'}} numberOfLines={1}>{room.name}</Text>
          </View>
          {song ?
            <View style={styles.info}>
              <Text style={{fontSize: 11}} numberOfLines={1}>{song.songInfo.name}</Text>
            </View> : null
          }
          <Footer style={{borderTopWidth: 0}}>
            <FooterTab>
              <Button onPress={() => {
                //updub the song
              }}>
                <Icon name="ios-arrow-up"/>
              </Button>
              <Button onPress={() => {
                //downdub song
              }}>
                <Icon name="ios-arrow-down"/>
              </Button>
              <Button onPress={() => {
                Actions.room({title: room.name});
              }}>
                <Icon name="ios-chatbubbles"/>
              </Button>
              <Button onPress={() => {
                if (playing) {
                  this.setState({playing: false});
                } else {
                  this.getSongTime(room);
                }
              }}>
                <Icon name={playing ? "ios-volume-up" : "ios-volume-off"}/>
              </Button>
            </FooterTab>
          </Footer>
        </View>
      );
    } else {
      return null;
    }
  }
}
const styles = {
  playerContainer: {
    backgroundColor: '#f8f8f8',
    height: 80,
  },
  info: {
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
  },
  player: {
    alignSelf: 'stretch',
    height: 1,
    width: 1,
  },
};
