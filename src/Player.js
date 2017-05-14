import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import YouTube from 'react-native-youtube'
import app from './app';
import Socket from './API/socket';

export default class Player extends Component {
  constructor(props) {
    super(props);

    let socket = new Socket();

    this.state = {
      room: null,
      song: null,
    };

    EventEmitter.on('room', (room) => {
      socket.join(room._id);
      if (room.currentSong) {
        this.setState({playing: true});
        this.getSongTime(room);
      } else {
        this.setState({playing: false});
      }
    });
  }

  getSongTime(room) {
    app.user.currentSong(room._id).then(song => {
      this.setState({song: song.data, room: room, playing: true});
    });
  }

  render() {
    //For development so the sound doesn't blast me whenever i open a room
    // if (true) {
    //   return (<Footer>
    //     <FooterTab>
    //     </FooterTab>
    //   </Footer>);
    // }
    console.log(this.state.room);
    let playing = this.state.playing;
    if (this.state.song) {
      return (
        <Footer>
          <FooterTab>
            <YouTube
              ref="youtubePlayer"
              videoId={this.state.song.songInfo.fkid}
              play={this.state.playing}
              hidden={false}
              playsInline={true}
              showinfo={false}
              apiKey={'AIzaSyBkJJ0ZoT8XbBDYpZ8sVr1OkVev4C5poWI'}
              origin={'https://www.youtube.com'}

              onReady={(e) => {
                this.refs.youtubePlayer.seekTo(this.state.song.startTime);
                this.setState({isReady: true})
              }}

              style={styles.player}/>


            <Button onPress={() => {
              if (playing) {
                this.setState({playing: false});
                console.log(this.refs.youtubePlayer);
                this.refs.youtubePlayer.props.play = false;
                // this.refs.youtubePlayer.setNativeProps({play: false});
              } else {
                this.getSongTime(this.state.room);
              }
            }}>
              <Icon name={playing ? "ios-volume-up" : "ios-volume-off"}/>
            </Button>
          </FooterTab>
        </Footer>
      );
    } else {
      return null;
    }
  }
}
const styles = {
  player: {
    alignSelf: 'stretch',
    height: 1,
    width: 1,
  },
};
