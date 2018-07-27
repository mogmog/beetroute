import React from "react";
import shortid from "shortid";

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';

import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';

const { TabPane } = Tabs;

import NumberInfo from 'components/NumberInfo';

const TabChartCard = ({ data }) => {

  const activeKey = '0', offlineData = [];

  for (let i = 0; i < 10; i += 1) {
    offlineData.push({
      name: `Item${i}`,
      cvr: Math.ceil(Math.random() * 9) / 10,
    });
  }

  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const CustomTab = ({ data, currentTabKey: currentKey }) => (
    <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
      <Col span={12}>
        <NumberInfo
          title={data.name}
          subTitle="Thing"
          gap={2}
          total={`${data.cvr * 100}%`}
          theme={currentKey !== data.name && 'light'}
        />
      </Col>
      <Col span={12} style={{ paddingTop: 36 }}>
        <Pie
          animate={false}
          color={currentKey !== data.name && '#BDE4FF'}
          inner={0.55}
          tooltip={false}
          margin={[0, 0, 0, 0]}
          percent={data.cvr * 100}
          height={64}
        />
      </Col>
    </Row>
  );

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: '0 0 32px 0' }}
      style={{ marginTop: 32 }}
    >
      <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
        {offlineData.map(shop => (
          <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
            <div style={{ padding: '0 24px' }}>
              <TimelineChart
                height={400}
                data={offlineChartData}
                titleMap={{ y1: '客流量', y2: '支付笔数' }}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};
export default TabChartCard;




