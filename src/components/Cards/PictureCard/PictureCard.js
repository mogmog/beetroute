import React, {Component} from 'react';
import InstagramEmbed from 'react-instagram-embed'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

class PictureCard extends Component {
  constructor(props) {
    super(props);

    this.state = {modal: false};
  }

  render() {

    const {data, onClick, extra, clickevents, index} = this.props;

    const {modal} = this.state;

    return (<Card>

      <Card.Header title={<span style={{width : '100%'}}>{extra}</span>}></Card.Header>
      <Card.Body>

          <img
            key={'dfdfdf' + index}
            src={index === 0 ? `https://scontent-lhr3-1.cdninstagram.com/vp/90f53826a813a8b2bbb899c52f96f031/5C07791C/t51.2885-15/e35/21819989_859302307560171_6598725257505275904_n.jpg` : `https://scontent-lhr3-1.cdninstagram.com/vp/fca2f285a57702a9e17ba6b13a066283/5BF3159C/t51.2885-15/e35/21879789_132582617375569_1489561097101901824_n.jpg`}
            alt=""
            style={{ width: '100%', height: '250px' }}
          />

      </Card.Body>
    </Card>);
  }
}

PictureCard.defaultProps = {
  data: {},
}

export default PictureCard;
