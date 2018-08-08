import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';

class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {data, onClick, extra, clickevents, index, open, onSwipeDown, onVerticalChange} = this.props;

    const {modal, currentThing} = this.state;

    return (

      <div>
        <Card style={{backgroundColor : 'rgba(255,255,255,0.4)'}}>

          <Card.Header>
            {extra}
          </Card.Header>

          <Card.Body>
            <h2> I DISPLAY ROUTES </h2>
          </Card.Body>
        </Card>

      </div>);
  }
}

RouteCard.defaultProps = {
  data: {},
}

export default RouteCard;
