import React, {Component} from 'react';

import numeral from 'numeral';

import SimpleMentionEditor from './Mention';

import {
  ChartCard,
  Field,
  Pie,
  ChartCardHeader
} from '../../Charts/index';

import {Card, Button, Icon, Divider } from 'antd';

import Stock from './Stock';
import StockSource from './StockSource';

import Modal from "../../Modal/Modal";
import MapCard from "../../Charts/MapCard/index";


class SocialMediaReachCard extends Component {
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

    console.log(clickevents);
    console.log(clickevents);
    console.log(clickevents);

    return (<MapCard
      bordered={false}
      contentHeight={150}
      extra={extra}
    >

      {clickevents && <SimpleMentionEditor clickevents={clickevents.testChoro2}></SimpleMentionEditor>}


    </MapCard>);
  }
}

SocialMediaReachCard.defaultProps = {
  data: {},
}

export default SocialMediaReachCard;
