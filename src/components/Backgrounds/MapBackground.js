import React, {Component} from 'react';
import styles from './styles.css';
import _ from 'lodash';

class MapBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {"isInitialPan" : true};
  }

  componentDidMount() {

    this.browser = window.vts.browser(this.map, {
      map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-map/mapConfig.json',
    });

    const that = this;

    that.browser.on('map-position-changed',that.props.onCameraChange);
  }

  componentDidUpdate(prevProps) {

      if ((prevProps.slideIndex && (this.props.slideIndex !== prevProps.slideIndex)) || !prevProps.slideIndex) {

        this.browser.autopilot.flyTo(this.props.card.camera, {
          maxHeight: 1000,
          maxDuration: 2500,
          mode: 'direct'
        });

        this.browser.autopilot.setAutorotate(6);
      }
  }

  render() {

    const {children} = this.props;

    return (

      <div className={styles.wrapper}>
        <div ref={(e) => this.map = e} style={{'width': '100vw', 'height': '100vh'}}></div>
          {children}
      </div>);
  }
}

MapBackground.defaultProps = {}

export default MapBackground;
