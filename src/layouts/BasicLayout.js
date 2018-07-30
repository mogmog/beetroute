import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon, message, Button} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Route, Redirect, Switch, routerRedux} from 'dva/router';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import {enquireScreen, unenquireScreen} from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import {getRoutes} from '../utils/utils';
import Authorized from '../utils/Authorized';
import {getMenuData} from '../common/menu';
import logo from '../assets/logo.svg';

import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import {Motion, spring} from 'react-motion';

import styles from './BasicLayout.less';
import CardJSONEditor from "../components/CardJSONEditor/CardJSONEditor";
import CardLoader from "../components/CardLoader/CardLoader";

const {Content, Header, Footer} = Layout;
const {AuthorizedRoute, check} = Authorized;


/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */


const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {

  state = {
    isMobile: false,
    isSqueezed: false
  };

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle() {
    const {routerData, location} = this.props;
    const {pathname} = location;
    let title = 'Ant Design Pro';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  }

  getBaseRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const {routerData} = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };

  handleMenuCollapse = collapsed => {

    alert("handleMenuCollapse");
    const {dispatch} = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  handlePageSqueeze() {
    this.setState({isSqueezed: !this.state.isSqueezed});
  }

  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
    } = this.props;
    const {isMobile: mb} = this.state;
    const {isSqueezed} = this.state;

    const bashRedirect = this.getBaseRedirect();

    return (
      <DocumentTitle title={this.getPageTitle()}>

          <Switch>

            {getRoutes(match.path, routerData).map(item => (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/exception/403"
              />
            ))}
            <Redirect exact from="/" to={bashRedirect} />
            <Route render={NotFound} />
          </Switch>

      </DocumentTitle>
    );
  }
}

export default connect(({user, global = {}, loading}) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
