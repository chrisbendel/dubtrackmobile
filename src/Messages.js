import React, {Component} from 'react';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';

import MessageView from './MessageView';
export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        side="right"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<MessageView/>}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
      </Drawer>
    );
  }
}
