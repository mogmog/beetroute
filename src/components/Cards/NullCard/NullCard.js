import React, {Component} from 'react';
import CardAdder from './../../../components/CardAdder/CardAdder';

import { Row, Col, Card, Tooltip, Button } from 'antd';

class NullCard extends Component {

  constructor(props) {
    super(props);
    this.state = {visible : false};
  }

  showModal() {
    this.setState({visible : true})
  }

  render() {
    const { visible } = this.state;
    return (<Card><h5>This position is not yet implemented...</h5><Button onClick={this.showModal.bind(this)}>Add Card </Button> <CardAdder visible={visible}/></Card>);
  }
}

export default NullCard;


