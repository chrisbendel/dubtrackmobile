import React, {Component} from 'react';

import api from './API/api';
import Lobby from './Lobby';
import Room from './Room';
import Settings from './Views/SettingsView';
import Messages from './Views/MessageListView';

import {Actions, Scene, Router} from 'react-native-router-flux';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="lobby" component={Lobby} initial={true} title="Lobby"/>
    <Scene key="room" backTitle="Back" component={Room} title="Room"/>
    <Scene key="messages" component={Messages} title="Messages"/>
    <Scene key="settings" component={Settings} title="Settings"/>
  </Scene>
);

export default class app extends Component {
  static user = new api();

  constructor(props) {
    super(props);
    this.state = {
      newMessages: 0
    };

    app.user.login('dubtrackmobile', 'insecure');
    app.user.setSocket();
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
    return <Router scenes={scenes}/>
  }
}
