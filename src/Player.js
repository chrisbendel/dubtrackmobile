import React, {Component} from 'react';

import {
  Text,
  View,
} from 'react-native';

import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import YouTube from 'react-native-youtube'
import Nav from'./Views/Nav';
import app from './app';

export default class Player extends Component {
  constructor(props) {
    super(props);
    console.log(app.user.room);
  }

  render() {
    if (!app.user.room) {
      return (
        <Footer>
          <FooterTab>
          </FooterTab>
        </Footer>
      );
    }

    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="play"/>
          </Button>
          <Button>
            <YouTube
              ref="youtubePlayer"
              //Set video id from currentsong.fkid
              videoId='JYcQslffyYg'
              play={true}
              hidden={false}
              playsInline={true}
              loop={false}
              showinfo={false}
              apiKey={'AIzaSyBkJJ0ZoT8XbBDYpZ8sVr1OkVev4C5poWI'}
              origin={'https://www.youtube.com'}

              onReady={(e) => {
                this.setState({isReady: true})
              }}
              onChangeState={(e) => {
                this.setState({status: e.state})
              }}
              onChangeQuality={(e) => {
                this.setState({quality: e.quality})
              }}
              onError={(e) => {
                this.setState({error: e.error})
              }}
              onProgress={(e) => {
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
              style={{alignSelf: 'stretch', height: 1, width: 1, backgroundColor: 'black', marginVertical: 10}}/>
          </Button>
          <Button>
            <Icon name="pause"/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
