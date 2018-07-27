import React, {Component} from 'react';


import {
  ChartCard,
  Field,
  Pie,
  ChartCardHeader
} from '../../Charts/index';

import {Card, Button, Icon, Divider } from 'antd';

import Modal from "../../Modal/Modal";

class MediaChartCard extends Component {
  constructor(props) {
    super(props);

    this.state = {modal: false};
  }

  toggleModal(e) {
    this.setState({modal: !this.state.modal});
  }

  render() {

    const {data, onClick, extra, clickevents} = this.props;

    const {modal} = this.state;

    return (<Card
      bordered={false}
      contentHeight={150}
      extra={extra}
    >

      I am a card

    </Card>);
  }
}

MediaChartCard.defaultProps = {
  data: {},
}

export default MediaChartCard;
