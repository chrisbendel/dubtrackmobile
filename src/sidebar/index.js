import React, {Component, Dimensions, Platform} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Content, Text, List, ListItem, Icon, View} from 'native-base';

import sidebarTheme from './sidebar-theme';
import Drawer from 'react-native-drawer'
import Settings from './../Settings';
export default class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  render() {
    return (
      <Drawer
        type="static"
        content={<Settings />}
        tapToClose={true}
        panThreshold={.35}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: 200,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    // top: (Platform.OS === 'android') ? 45 : 55,
    width: 210,
    height: 75,
    resizeMode: 'cover',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingLeft: 11,
    paddingTop: 5,
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: 25,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});
