import React from 'react';
import {geolocated} from 'react-geolocated';
import {Icon, PullToRefresh, ListView, Popover, NavBar} from 'antd-mobile';

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt=""/>;

const Item = Popover.Item;

class GeoLocate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {visible: false}
  }

  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };

  onSelect(opt, coords) {

    console.log(coords);
    console.log(coords);
    console.log(coords);

    this.setState({
      visible: false,
      selected: opt.props.value,
    });

    this.props.addCard(opt.props.value, coords);
  }

  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>

            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{color: 'currentColor'}}
                     visible={this.state.visible}
                     overlay={[
                       (<Item key="TextCard" value="TextCard" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Add
                         Card</Item>),
                     ]}
                     align={{
                       overflow: {adjustY: 0, adjustX: 0},
                       offset: [-10, 0],
                     }}
                     onVisibleChange={this.handleVisibleChange.bind(this)}
                     onSelect={(opt) => {
                       this.onSelect(opt, this.props.coords)
                     }}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis"/>
              </div>


            </Popover>
          </div>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocate);
