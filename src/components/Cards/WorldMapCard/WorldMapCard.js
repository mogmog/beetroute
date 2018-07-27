import React, {Component} from 'react';
import { Row, Col, Card, Tooltip, Button } from 'antd';

import NumberInfo from './../../../components/NumberInfo';
import CountDown from './../../../components/CountDown';
import ActiveChart from './../../../components/ActiveChart';

import WorldMap from './../../Maps/WorldMap';
import numeral from 'numeral';

import styles from './WorldMapCard.less';

class WorldMapCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateZoom() {
    this.setState({zoomto : [1,2]})
  }

  render() {

    const targetTime = new Date().getTime() + 3900000;

    return (<Card title="World Map" extra={<Button onClick={this.updateZoom.bind(this)}>Zoom</Button>} bordered={false}>
      <Row>
        <Col md={6} sm={12} xs={24}>
          <NumberInfo
            subTitle="Sub"
            total={numeral(999).format('0,0')}
          />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <NumberInfo subTitle="FDGFG" total="92%" />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <NumberInfo subTitle="DFGDF" total={<CountDown target={targetTime} />} />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <NumberInfo
            subTitle="DFGFG"
            total={numeral(234).format('0,0')}
          />
        </Col>
      </Row>
      <div className={styles.mapChart}>
        <WorldMap zoomTo={this.state.zoomto}/>
      </div>
    </Card>);
  }
}

export default WorldMapCard;
