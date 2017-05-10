import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

import app from './app';

export default class Player extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="play"/>
          </Button>
          <Button>
            <Icon name="stop"/>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button>
            <Icon name="pause"/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
