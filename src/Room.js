GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.data,
    }
  }

  componentWillMount() {
    //get room details
    this.props.api.connect(this.props.roomId);
    console.log(this.props.api);
    // fetch('https://api.dubtrack.fm/room/' + this.props.roomId)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log('room details');
    //     console.log(json);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Room name </Text>
      </View>
    );
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
