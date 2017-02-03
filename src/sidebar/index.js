import React, {Component, Dimensions, Platform} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Content, Text, List, ListItem, Icon, View} from 'native-base';

import sidebarTheme from './sidebar-theme';

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
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'}
               style={styles.drawerCover}>
          <Image
            square
            style={styles.drawerImage}
            source={'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'}
          />
        </Image>
        <List>
          <ListItem button iconLeft>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#0209D8', paddingLeft: 14 }]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Anatomy</Text>
            </View>
          </ListItem>
        </List>
      </Content>
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
