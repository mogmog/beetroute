import React, {Component} from 'react';
import Swipeable from 'react-swipeable'


import InstagramEmbed from 'react-instagram-embed'
import {Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';

class Picture extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    const {id, thekey } = this.props;

    return (<div style={{height : '300px', lineHeight :'300px'}}><iframe key={thekey} style={{pointerEvents: 'none', height : '300px'}} src={`https://www.instagram.com/p/${id}/embed?caption=false`} width="100%" height="300" frameBorder="0" scrolling="no" allowtransparency="true"></iframe></div>)
  }
}

export default Picture;
