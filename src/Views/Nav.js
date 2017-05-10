import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  Container,
  Footer,
  Content,
  FooterTab,
  Button,
  Icon,
  Fab,
} from 'native-base';

import ActionButton from 'react-native-action-button';

import app from './../app';
import {Actions} from 'react-native-router-flux';

export default class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessages: 0,
      active: false,
    };

    this.checkNewPms();
  }

  checkNewPms() {
    app.user.pm.checkNew()
      .then(count => {
        this.setState({
          newMessages: count,
        })
      })
  }



  render() {
    return (
      <ActionButton buttonColor="#9b59b6" >
        <ActionButton.Item title="Lobby" onPress={() => {
          Actions.lobby();
        }}>
          <Icon name="ios-home"/>
        </ActionButton.Item>
        <ActionButton.Item title="Room" onPress={() => {
          Actions.room();
        }}>
          <Icon name="ios-musical-note"/>
        </ActionButton.Item>
      </ActionButton>
    );
  }

  // render() {
  //   return (
  //     <View>
  //       <Fab
  //         style={{marginBottom: 20}}
  //         containerStyle={{marginBottom: 20}}
  //         active={this.state.active}
  //         direction="up"
  //         position="bottomRight"
  //         onPress={() => this.setState({active: !this.state.active})}>
  //         <Icon name="md-menu"/>
  //         <Button onPress={() => {
  //           this.setState({active: !this.state.active});
  //           Actions.lobby();
  //         }}>
  //           <Icon name="ios-home"/>
  //         </Button>
  //         <Button onPress={() => {
  //           this.setState({active: !this.state.active});
  //           Actions.room();
  //         }}>
  //           <Icon name="ios-musical-note"/>
  //         </Button>
  //         <Button onPress={() => {
  //           this.setState({active: !this.state.active});
  //           Actions.messages();
  //         }}>
  //           <Icon name="ios-mail"/>
  //         </Button>
  //         <Button onPress={() => {
  //           this.setState({active: !this.state.active});
  //           Actions.settings();
  //         }}>
  //           <Icon name="ios-settings"/>
  //         </Button>
  //       </Fab>
  //     </View>
  //   );
  // }
}
