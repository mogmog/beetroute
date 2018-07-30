import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

class TextCard extends Component {
  constructor(props) {
    super(props);
    this.state = {modal: false};
  }

  render() {

    const {data, onClick, extra, clickevents, index} = this.props;

    const {modal} = this.state;

    return (

      <Card>
        <Card.Body>

          {index === 56 && <div><h1>done for the day</h1> <h1 style={{fontSize : '96pt'}}> 🍺 </h1></div>}

          {index === 57 && <div><h1>tomorrows climb</h1></div>}

        </Card.Body>
      </Card>);
  }
}

TextCard.defaultProps = {
  data: {},
}

export default TextCard;
