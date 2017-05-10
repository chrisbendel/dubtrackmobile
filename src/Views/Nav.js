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
      <Fab
        active={this.state.active}
        direction="up"
        position="bottomRight"
        onPress={() => this.setState({active: !this.state.active})}>
        <Icon name="md-menu"/>
        <Button onPress={() => {
          this.setState({active: !this.state.active});
          Actions.lobby();
        }}>
          <Icon name="ios-home"/>
        </Button>
        <Button onPress={() => {
          this.setState({active: !this.state.active});
          Actions.room();
        }}>
          <Icon name="ios-musical-note"/>
        </Button>
        <Button onPress={() => {
          this.setState({active: !this.state.active});
          Actions.messages();
        }}>
          <Icon name="ios-mail"/>
        </Button>
        <Button onPress={() => {
          this.setState({active: !this.state.active});
          Actions.settings();
        }}>
          <Icon name="ios-settings"/>
        </Button>
      </Fab>
    );
  }

  // render() {
  //   return (
  //     <Footer>
  //       <FooterTab>
  //         <Button onPress={() => {
  //           Actions.lobby();
  //         }}>
  //           <Icon size={30} name={'ios-home'}/>
  //         </Button>
  //         <Button onPress={() => {
  //           Actions.room();
  //         }}>
  //           <Icon size={30} name={'ios-musical-notes'}/>
  //         </Button>
  //         <Button badgeValue={this.state.newMessages} onPress={() => {
  //           app.user.pm.listMessages()
  //             .then(() => {
  //               Actions.messages();
  //             });
  //         }}>
  //           <Icon size={30} name={'ios-mail'}/>
  //         </Button>
  //         <Button onPress={() => {
  //           Actions.settings();
  //         }}>
  //           <Icon size={30} name={'ios-settings'}/>
  //         </Button>
  //       </FooterTab>
  //     </Footer>
  //   );
  // }
}
