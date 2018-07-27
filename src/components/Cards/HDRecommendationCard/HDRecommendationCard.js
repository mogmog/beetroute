import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
  ChartCardHeader
} from '../../Charts/index';

import { Row, Col, Modal, Icon , Card, List} from 'antd';

import sample from './sample';
import schema from './schema';

class HDSuggestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = { modal : false };
    this.sample = sample;
    this.schema = schema;
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({modal: !this.state.modal});
  }

  render() {

    const {data} = this.props;

    const { modal } = this.state;

    return (

      <ChartCard
        bordered={false}
        contentHeight={252}
        title={<ChartCardHeader icon={<Icon type={'check'} />} text={data.title}/>}
      >

        <Row>
          <Col span={24}>
            <List
              size="small"
              itemLayout="horizontal"
              dataSource={data.list}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a> {item}</a>}
                  />
                </List.Item>
              )}
            />
          </Col>

        </Row>

      </ChartCard>
     );
  }
}

HDSuggestionCard.defaultProps = {
  data: sample,
}


export default HDSuggestionCard;
