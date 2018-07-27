import React from 'react';
import { Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const BigTrend = ({ colorful = true, reverseColor = false, flag, children, percent, graph, className, ...rest }) => {
  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className
  );

  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>

      {flag && (
        <div>
        <Row>

          <Col span={8}>
            <span className={styles.label}>Post Volume</span>
          </Col>

          <Col span={16}>
            <span className={styles[flag]}><Icon type={`${flag === 'up' ? 'plus' : 'minus'}`} /></span>
            <span className={styles[flag]}> {percent}% </span>
            <div className={styles.sublabel}>from last month</div>
          </Col>
        </Row>
        </div>
      )}

    </div>
  );
};

export default BigTrend;
