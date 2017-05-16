import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";

import {AsyncStorage, View, Text, StatusBar, Dimensions} from 'react-native';
import {Container} from 'native-base';
import {Scene, Router, Actions, DefaultRenderer} from 'react-native-router-flux';

import api from './API/api';
import Lobby from './Lobby';
import Room from './Room';
import Auth from './Auth';
import Messages from './Messages';
import Player from './Player';
import SlidingUpPanel from 'react-native-sliding-up-panel';
import Profile from './Profile';
import PM from './Views/PrivateMessage';
import Nav from'./Views/Nav';
const {height, width} = Dimensions.get('window');

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
    app.user.checkNew();
    // app.user.login('dubtrackmobile', 'insecure');
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        EventEmitter.emit('connectUser', user._id);
      }
    });
  }

  refreshOnBack() {
    Actions.lobby({type: 'reset'});
  }

  getContainerHeight = (height) => {
    this.setState({
      containerHeight: height
    });
  };

  render() {
    return (
      <Container style={{marginTop: 22}}>
        <Nav/>
        <Router hideNavBar={true}>
          <Scene key="root">
            <Scene key="lobby" renderBackButton={() => (null)} component={Lobby} title="Lobby"/>
            {/*<Scene key="room" renderBackButton={() => (null)} component={Room} title="Room"/>*/}
            <Scene key="messages" component={Messages} title="Messages"/>
            <Scene key="pm" component={PM} title="pm"/>
            <Scene key="auth" renderBackButton={() => (null)} component={Auth} title=""/>
            <Scene key="profile" component={Profile} title="Profile"/>
          </Scene>
        </Router>
        <SlidingUpPanel
          containerMaximumHeight={height - 54}
          handlerHeight={80}
          allowStayMiddle={false}
          handlerDefaultView={Player}>
          <View style={{flexDirection: 'row'}}>
            <Room/>
          </View>
        </SlidingUpPanel>

      </Container>
    );
  }
}
