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
  Navigator
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import Room from './Room';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([])
    }
    this.loadData();
  }

  loadData() {
    var rooms = [];
      return fetch('https://api.dubtrack.fm/room')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    var {height, width} = Dimensions.get('window');
    return (
      <Card>
        <CardImage>
          <TouchableHighlight onPress={ () => this.pressRow(rowData)}>
              <Image
                style={{width: width, height: 150}}
                source={{uri: rowData.background.secure_url}}
              />
          </TouchableHighlight>
        </CardImage>
        <CardTitle>
          <Text style={styles.rowTitle}> {rowData.name} </Text>
        </CardTitle>
      </Card>
    );
  }

  //TODO: animate transitions
  //TODO: handle click to navigate to room
  pressRow(rowData) {
    fetch(GLOBAL.BASE_URL + 'room/' + rowData.roomUrl)
    .then((res) => res.json())
    .then((json) => {
      this.props.navigator.push({
        name: 'Room',
        passProps: {
          data: json
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
    // this.props.navigator.push({
    //   name: 'Room',
    //   passProps: {
    //     url: rowData.roomUrl
    //   }
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
