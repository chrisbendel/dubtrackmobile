import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Header,
  Body,
  Title,
  Text,
  Left,
  Right,
} from 'native-base';

import app from '../app';

//TODO: This file needs to hold the list view of each message
export default class MessageListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  componentWillMount() {
    app.user.pm.listMessages()
      .then(messages => {
        console.log(messages);
        this.setState({
          conversations: messages,
        })
      })
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
          <Title>Private Messages</Title>
          </Body>
        </Header>
        <Content>
          <List
            dataArray={this.state.conversations}
            renderRow={(item) =>
              <ListItem thumbnail button onPress={() => {
                console.log(item);
              }} >
                <Left>
                  <Thumbnail square size={60} source={{uri: item.usersid[0].profileImage.secure_url}}/>
                </Left>
                <Body>
                  <Text style={{fontWeight: 'bold', fontSize:16}}>{item.usersid[0].username}</Text>
                  <Text note>{item.latest_message_str}</Text>
                </Body>
              </ListItem>
        }>

          </List>
        </Content>
      </Container>

    );
  }
}
