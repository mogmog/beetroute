import React, {Component} from 'react';

import numeral from 'numeral';

import Trend from 'components/Trend';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import styles from './TrendCard.less';

class TrendCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (<ChartCard
      bordered={false}
      title="Something"
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={150}
    >
      <Trend flag="up" style={{ marginRight: 16 }}>
        UP<span className={styles.trendText} >12%</span>
      </Trend>
      <Trend flag="down">
        DOWN<span className={styles.trendText}>11%</span>
      </Trend>
    </ChartCard>);
  }
}

export default TrendCard;
