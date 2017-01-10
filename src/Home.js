import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import { Navigation } from 'react-native-navigation';

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
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    var {height, width} = Dimensions.get('window');
    console.log('rowdata');
    const tapRow = () => {
      alert('hi');
      this.pressRow(rowData);
    }
    return (
      <TouchableHighlight
        onPress={tapRow.bind(this)}
        <Card>
          <CardImage>
            <Image
              style={{width: width, height: 250}}
              source={{uri: rowData.background.secure_url}}
            />
          </CardImage>
          <CardTitle>
            <Text style={styles.rowTitle}> {rowData.name} </Text>
          </CardTitle>
        </Card>
      </TouchableHighlight>
      // <TouchableHighlight
      //   onPress={tapRow.bind(this)}
      //   style={styles.rowContainer}>
      //   <Text style={styles.rowTitle}>
      //     {rowData.name}
      //   </Text>
      // </TouchableHighlight>
    );
  }

  //TODO: handle click to navigate to room

  // pressRow(rowData) {
  //   this.props.navigator.push({
  //     screen: 'bogle.SubForum',
  //     title: rowData.title,
  //     passProps: {
  //       title: rowData.title,
  //       url: rowData.url,
  //     }
  //   });
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
