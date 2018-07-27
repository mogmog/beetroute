import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import numeral from "numeral";

import {
  ChartCard,
  Field,
} from 'components/Charts';

class BarChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

// Data source
    const  data2 = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 }
    ];

// Define the metric
    const  cols  = {
      sold : { alias : ' Sales ' },
      genre : { alias : ' Game category ' }
    };

    return (<ChartCard
      bordered={false}
      title="Something"
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
    >
      <Chart height={250} data={data2} scale={cols}>
        <Axis name="genre" />
        <Axis name="sold" />
        <Tooltip />
        <Geom type="interval" position="genre*sold" color="genre" />
      </Chart>
    </ChartCard>);
  }
}

BarChartCard.defaultProps = {
  data: {}
};

export default BarChartCard;
