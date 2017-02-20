import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Modal,
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
import MessageView from './MessageView';

//TODO: This file holds the list view of messages with each person
export default class MessageListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.modalVisible}
          >
            <MessageView/>
          </Modal>
          <List
            dataArray={this.state.conversations}
            renderRow={(item) =>
              <ListItem thumbnail button onPress={() => {
                this.setModalVisible(true);
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
