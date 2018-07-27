import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';

class TrendCardBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (<ChartCard
      bordered={false}
      title="Else"
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={150}
    >

      <MiniBar data={[{"x":"2018-06-13","y":7},{"x":"2018-06-14","y":5},{"x":"2018-06-15","y":4},{"x":"2018-06-16","y":2},{"x":"2018-06-17","y":4},{"x":"2018-06-18","y":7},{"x":"2018-06-19","y":5},{"x":"2018-06-20","y":6},{"x":"2018-06-21","y":5},{"x":"2018-06-22","y":9},{"x":"2018-06-23","y":6},{"x":"2018-06-24","y":3},{"x":"2018-06-25","y":1},{"x":"2018-06-26","y":5},{"x":"2018-06-27","y":3},{"x":"2018-06-28","y":6},{"x":"2018-06-29","y":5}]} height={100} />

    </ChartCard>);
  }
}

export default TrendCardBar;
