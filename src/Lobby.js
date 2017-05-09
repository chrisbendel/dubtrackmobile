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
  TextInput,
  ScrollView,
  RefreshControl
} from 'react-native';

import GridView from 'react-native-grid-view'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import app from './app';
import Nav from './Views/Nav';
import {Actions} from 'react-native-router-flux'
import {
  Container,
  Header,
  Item,
  Input,
  Body,
  Button,
  Icon,
  Content
} from 'native-base';

let {height, width} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      roomSearch: '',
      // dataSource: ds.cloneWithRows([]),
      dataSource: [],
      refreshing: false,
    };
    console.log(this.props);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData(room = null) {
    if (room) {
      app.user.filterRooms(room)
        .then(rooms => {
          this.setState({
            dataSource: rooms,
            // dataSource: this.state.dataSource.cloneWithRows(rooms),
            refreshing: false
          })
        });
    } else {
      app.user.listRooms()
        .then(rooms => {
          this.setState({
            // dataSource: this.state.dataSource.cloneWithRows(rooms),
            dataSource: rooms,
            refreshing: false
          })
        });
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.loadData();
  }

  pressRow(rowData) {
    return app.user.joinRoom(rowData._id).then(() => {
      Actions.room({room: rowData});
    });
  }

  renderRow(rowData) {
    let uri;

    if (rowData.background) {
      uri = rowData.background.secure_url;
    } else {
      uri = 'https://res.cloudinary.com/hhberclba/image/upload/c_fill,fl_lossy,f_auto,w_320,h_180/default.png';
    }

    return (
      <Card>
        <CardImage>
          <TouchableHighlight onPress={() => this.pressRow(rowData)}>
            <Image
              style={{width: 150, height: 150}}
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

  render() {
    return (
      <Container style={{marginTop: 54}}>
        <Header searchBar rounded>
          <Item>
            <Icon name="search"/>
            <Input
              ref={'search'}
              placeholder='Search'
              placeholderTextColor={'black'}
              returnKeyType="search"
              returnKeyLabel="search"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(roomSearch) => this.setState({roomSearch})}
              onSubmitEditing={() => {
                this.loadData(this.state.roomSearch);
              }}/>
          </Item>
          <Button onpress={this.loadData(this.state.roomSearch)} transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <GridView
            items={this.state.dataSource}
            itemsPerRow={2}
            renderItem={this.renderRow.bind(this)}
            style={styles.listView}
          />
        </Content>
        <Nav/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rowTitle: {
    color: '#333333',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 0,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    justifyContent: 'center',
    padding: 10,
    margin: 6,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
});
