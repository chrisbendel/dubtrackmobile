import React, {Component} from 'react';
import EventEmitter from "react-native-eventemitter";
import SGListView from 'react-native-sglistview';

import {
  StyleSheet,
  Text,
  Dimensions,
  ListView,
  RefreshControl,
  WebView
} from 'react-native';

import app from './app';
import {Actions} from 'react-native-router-flux'
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Body,
  List,
  ListItem,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';

let {height, width} = Dimensions.get('window');
const uri = 'https://res.cloudinary.com/hhberclba/image/upload/c_fill,fl_lossy,f_auto,w_320,h_180/default.png';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid});
    this.query = '';
    this.state = {
      // dataSource: [],
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
  }

  componentWillMount() {
    this.listRooms();
  }

  //TODO: Figure out how creating a new room works
  //TODO: possibly do it in a modal or something from the lobby page
  createRoom() {

  }

  listRooms(room = null) {
    this.setState({refreshing: true});
    if (room) {
      app.user.filterRooms(room)
        .then(rooms => {
          rooms.forEach((room) => {
            if (!room.background) {
              room.background = {secure_url: uri};
            }
          });
          this.setState({
            // dataSource: rooms,
            dataSource: this.state.dataSource.cloneWithRows(rooms),
            refreshing: false
          })
        });
    } else {
      app.user.listRooms()
        .then(rooms => {
          rooms.forEach((room) => {
            if (!room.background) {
              room.background = {secure_url: uri};
            }
          });
          this.clearSearch();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rooms),
            refreshing: false
          });
        });
    }
  }

  _onRefresh() {
    this.listRooms();
    this.clearSearch();
  }

  pressRow(rowData) {
    app.user.joinRoom(rowData._id);
    EventEmitter.emit('roomJoin', rowData);
    Actions.room({room: rowData, title: rowData.name});
  }

  renderRow(rowData) {
    return (
      <ListItem onPress={() => this.pressRow(rowData)}>
        <Thumbnail size={70} source={{uri: rowData.background.secure_url}}/>
        <Body>
        <Text style={styles.rowTitle}>{rowData.name}</Text>
        <Text style={styles.rowInfo}>{rowData.activeUsers} current users</Text>
        <Text style={styles.rowInfo}>
          {rowData.currentSong ? rowData.currentSong.name : 'No one is playing right now!'}
        </Text>
        </Body>
      </ListItem>
    );
  }

  clearSearch() {
    this.refs.search._root.setNativeProps({text: ''});
    this.query = '';
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon onPress={this.clearSearch.bind(this)} name="ios-close"/>
            <Input
              ref='search'
              placeholder='Search rooms'
              placeholderTextColor={'black'}
              returnKeyType="search"
              returnKeyLabel="search"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={search => this.query = search}
              onSubmitEditing={() => this.listRooms(this.query)}/>
          </Item>
          <Button iconRight transparent onPress={() => {
            alert('new room')
          }}>
            <Text>Create Room</Text>
            <Icon name="add-circle"/>
          </Button>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <SGListView
            pageSize={10}
            initialListSize={50}
            enableEmptySections={true}
            removeClippedSubviews={false}
            scrollRenderAheadDistance={1}
            premptiveLoading={5}
            onEndReachedThreshold={1}
            stickyHeaderIndices={[]}
            // dataArray={this.state.dataSource}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowTitle: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },
  rowInfo: {
    color: '#333333',
    fontSize: 12,
    textAlign: 'center',
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
