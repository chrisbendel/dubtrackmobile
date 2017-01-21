GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  Navigator,
  Button,
  Menu
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import Room from './Room';
import Tabs from 'react-native-tabs';
import app from './app';
import SideMenu from 'react-native-side-menu';

export default class Home extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.loadData();
  }

  loadData() {
    return fetch('https://api.dubtrack.fm/room')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json.data)
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <Tabs>
              <Text name="Home" onPress={() => {

              }}>Lobby</Text>
              <Text name="Current Room" onPress={() => {

              }}>Current Room</Text>
              <Text name="Settings" onPress={() => {

              }}>Settings</Text>
            </Tabs>
          </View>
          <ListView
            style={styles.roomList}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
    );
  }

  renderRow(rowData) {
    var {height, width} = Dimensions.get('window');
    var uri;

    if (rowData.background) {
      uri = rowData.background.secure_url;
    } else {
      uri = 'https://res.cloudinary.com/hhberclba/image/upload/c_fill,fl_lossy,f_auto,w_320,h_180/default.png';
    }
    return (
      <Card>
        <CardImage>
          <TouchableHighlight onPress={ () => this.pressRow(rowData)}>
            <Image
              style={{width: width, height: 150}}
              source={{uri: uri}}
            />
          </TouchableHighlight>
        </CardImage>
        <CardTitle>
          <Text style={styles.rowTitle}> {rowData.name} </Text>
        </CardTitle>
      </Card>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Room',
      passProps: {
        roomId: rowData._id
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    position: 'absolute',
    top: 30,
    flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  roomList: {
    marginTop: 30,
  },
  rowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowTitle: {
    color: '#333333',
    fontSize: 18,
  },
});
