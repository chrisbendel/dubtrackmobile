GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {Text, Platform, Menu, Navigator, TouchableHighlight} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
const SideMenu = require('react-native-side-menu');
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';

import Home from './Home';
import Room from './Room';
import Settings from './Settings';
import DubAPI from './DubAPI/index';

export default class app extends Component {
  static api = new DubAPI({username: 'dubtrackmobile', password: 'insecure'}, function (err, bot) {
    console.log('hi from api construct');
    bot.on('connected', function (name) {
      console.log('Connected to ' + name);
    });
  });

  componentDidMount() {
    // app.api.connect('thephish');
  }

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let component;
    switch (route.title) {
      case 'Home':
        component = <Home
          navigator={navigator}
          {...route.passProps}
          api={app.api}/>;
        break;
      case 'Room':
        component = <Room
          navigator={navigator}
          {...route.passProps}
          api={app.api}/>;
        break;
      case 'Settings':
        break;
      default:
        component = null;
    }
    return component;
  };

  render() {
    const routes = [
      {title: 'Home', index: 0},
      {title: 'Room', index: 1},
      {title: 'Settings', index: 2}
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.renderScene}>
        /*
         <ScrollableTabView
         style={{marginTop: 20}}
         tabBarPosition={"bottom"}
         renderTabBar={() => <ScrollableTabBar/>}>
         <Home
         tabLabel='Home'
         data={app.api._}
         api={app.api}/>
         <Room
         tabLabel='Room'
         api={app.api}/>
         <Settings
         tabLabel="Settings"
         api={app.api}/>
         </ScrollableTabView >
         */
      </Navigator>
    );
  }
}
