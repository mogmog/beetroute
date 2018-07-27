import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
  const { isMobile, collapsed } = props;
  return ( <SiderMenu {...props} />
  );
};

export default SiderMenuWrapper;
