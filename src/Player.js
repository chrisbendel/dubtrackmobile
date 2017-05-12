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

//TODO: This component will handle the socket, music player, aka all incoming chats, room updates, etc
//TODO: Eventemitter can emit these actions to the other components updating their state
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
        app.user.currentSong(room._id).then(song => {
          this.setState({song: song.data, room: room});
        });
      }
    });
  }

  render() {
    if (true) {
      return (<Footer>
        <FooterTab>
        </FooterTab>
      </Footer>);
    }
    if (this.state.song) {
      return (
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="play"/>
            </Button>
            <Button>
              <YouTube
                ref="youtubePlayer"
                videoId={this.state.song.songInfo.fkid}
                play={true}
                hidden={false}
                playsInline={true}
                loop={false}
                showinfo={false}
                apiKey={'AIzaSyBkJJ0ZoT8XbBDYpZ8sVr1OkVev4C5poWI'}
                origin={'https://www.youtube.com'}

                onReady={(e) => {
                  this.refs.youtubePlayer.seekTo(this.state.song.startTime);
                  this.setState({isReady: true})
                }}

                style={{alignSelf: 'stretch', height: 1, width: 1, backgroundColor: 'black', marginVertical: 10}}/>
            </Button>
            <Button>
              <Icon name="pause"/>
            </Button>
          </FooterTab>
        </Footer>
      );
    } else {
      return (
        <Footer>
          <FooterTab>
          </FooterTab>
        </Footer>
      );
    }
  }
}
