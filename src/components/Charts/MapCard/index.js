import React from 'react';
import { Card, Spin } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

const MapCard = ({
  loading = false,
  contentHeight,
  title,
  avatar,
  action,
  total,
  footer,
  extra,
  children,
  ...rest
}) => {

  return (
    <div className={styles.MapCard} >
    <Card bodyStyle={{ padding: '8px 8px 8px 8px' }} {...rest} extra={extra}>
      {
        <Spin spinning={loading} wrapperClassName={styles.spin}>
          {children}
        </Spin>
      }
    </Card>
    </div>
  );
};

export default MapCard;
