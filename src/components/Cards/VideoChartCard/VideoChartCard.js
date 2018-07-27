import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape, Facet, G2, View } from 'bizcharts';

import { View as Something} from '@antv/data-set';
import sample from './sample.json';
import schema from './schema.json';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from 'components/Charts';

class VideoChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.schema = schema;
    this.sample = sample;
  }

  render() {
    const { data2 } = this.props;

    const data = [
      {country: 'Anti-West Sentiment', year: '2011', value: 502},
      {country: 'Anti-West Sentiment', year: '2012', value: 635},
      {country: 'Anti-West Sentiment', year: '2013', value: 809},
      {country: 'Anti-West Sentiment', year: '2014', value: 5268},
      {country: 'Anti-West Sentiment', year: '2015', value: 4400},
      {country: 'Anti-West Sentiment', year: '2016', value: 3634},
      {country: 'Anti-West Sentiment', year: '2017', value: 947},
      {country: 'Soviet Nostalgia', year: '2011', value: 106},
      {country: 'Soviet Nostalgia', year: '2012', value: 107},
      {country: 'Soviet Nostalgia', year: '2013', value: 111},
      {country: 'Soviet Nostalgia', year: '2014', value: 1766},
      {country: 'Soviet Nostalgia', year: '2015', value: 221},
      {country: 'Soviet Nostalgia', year: '2016', value: 767},
      {country: 'Soviet Nostalgia', year: '2017', value: 133},
      {country: 'Pro-Russia Sentiment', year: '2011', value: 163},
      {country: 'Pro-Russia Sentiment', year: '2012', value: 203},
      {country: 'Pro-Russia Sentiment', year: '2013', value: 276},
      {country: 'Pro-Russia Sentiment', year: '2014', value: 628},
      {country: 'Pro-Russia Sentiment', year: '2015', value: 547},
      {country: 'Pro-Russia Sentiment', year: '2016', value: 729},
      {country: 'Pro-Russia Sentiment', year: '2017', value: 408},
      {country: 'Undermining Western Cohesion', year: '2011', value: 200},
      {country: 'Undermining Western Cohesion', year: '2012', value: 200},
      {country: 'Undermining Western Cohesion', year: '2013', value: 200},
      {country: 'Undermining Western Cohesion', year: '2014', value: 460},
      {country: 'Undermining Western Cohesion', year: '2015', value: 230},
      {country: 'Undermining Western Cohesion', year: '2016', value: 300},
      {country: 'Undermining Western Cohesion', year: '2017', value: 300},
    ];
    const cols = {
      year: {
        type: 'linear',
        tickInterval: 1
      }
    }


    const colsMark = {
      year: {
        type: 'linear',
        tickInterval: 1
      }
    }

    var markData = [
      {"year": "2013", "type": "Protest", "value": 5},
      {"year": "2017", "type": "Protest", "value": 10},
    ];

    function formatter(text, item) {
      var point = item.point;
      var type = point['type'];
      return '<div style="width: 60px;text-align: center;font-size: 8px;line-height: 1.2;color: #fff;margin-left: -8px;"><span>' + type + '</span><br><span>' + '' + '</span></div>';
    }

    function test() {
      alert(11);
    }

    return (<ChartCard
      bordered={false}
      title={data.title}
      contentHeight={400}
    >
      <Chart height={400}  scale={cols} forceFit >

        {/*<View data={markData} scale={colsMark}>

          <Geom type="interval" position="year*value" color={['type', ['#ff1f00', '#093']]} size={3} >
            <Label
              content="Protest"
              custom={true}
              renderer={formatter}
              offset={0}
            />
          </Geom>

        </View>*/}

        <View data={data} scale={cols} >

          <Axis name="year" />
          <Axis name="value" />
          <Legend />

          <Geom type="line" position="year*value" size={5} color={['country', ['#1796D2', '#F07534', '#633085', '#17918B']]} />

        </View>

        <Tooltip crosshairs={{type:'line'}}/>

        <Legend />

      </Chart>
    </ChartCard>);
  }
}

VideoChartCard.defaultProps = {
  data: sample
};

export default VideoChartCard;
