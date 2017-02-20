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
  RefreshControl,
  Menu
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import app from './app';
import {Actions} from 'react-native-router-flux'
import {
  Container,
  Header,
  Title,
  Left,
  Item,
  Right,
  Footer,
  Input,
  FooterTab,
  Body,
  Button,
  Icon,
  Content
} from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let {height, width} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      roomSearch: '',
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };

  }

  componentDidMount() {
    this.loadData();
  }

  loadData(room) {
    this.props.toggleSpinner();
    if (room) {
      return fetch('https://api.dubtrack.fm/room/term/' + room)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data)
          });
          this.props.toggleSpinner();
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      return fetch('https://api.dubtrack.fm/room')
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data),
            refreshing: false,
          });
          this.props.toggleSpinner();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  _onRefresh() {
    this.loadData();
  }

  //use command+shift+k to enable keyboard hardware on ios emulator to test search bar
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search"/>
            <Input
              ref={'search'}
              placeholder='Search For a Room'
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
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>
      </Container>
    );
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
          <TouchableHighlight onPress={ () => this.pressRow(rowData)}>
            <Image
              style={{width: width * .97, height: 150}}
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
    this.props.toggleSpinner();
    app.user.joinRoom(rowData._id)
      .then(() => {
        this.props.toggleSpinner();
        this.props.showPage('room');
      });
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#4a8bfc',
    borderStyle: 'solid',
    backgroundColor: '#4a8bfc',
  },
  searchBar: {
    height: 40,
    textAlign: 'center',
  },
  rowTitle: {
    color: '#333333',
    fontSize: 18,
  },
});
