import React, {Component} from 'react';
import styles from './styles.css';

class MapBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    this.browser = window.vts.browser(this.map, {
      map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-Map-4/mapConfig.json',
      position: ['obj', 2.3514992, 48.8566101, 'float', 0.00, 0.00, -60.00, 0.00, 21255.06, 55.00]
    });

    this.browser.ui.getControl('compass').setVisible(false);

    this.browser.mapMobileModeAutodect = false;
    this.browser.mapMobileMode = true;
    this.browser.mapMobileTexelDegradation = 10;
    this.browser.rendererAntialiasing = false;

    this.browser.ui.getControl('compass').setVisible(false);
    // this.browser.ui.setStyle('zoom', {display : 'none'});
    // this.browser.ui.setStyle('space', {display : 'none'});
    // this.browser.ui.setStyle('search', {display : 'none'});
    // this.browser.ui.setStyle('link', {display : 'none'});
    // this.browser.ui.setStyle('credits', {display : 'none'});
  }

//  vts-search

  componentDidUpdate(newProps) {
    if (newProps.camera !== this.props.camera) {
      this.browser.autopilot.flyTo(['obj', 4.3514992, 48.8566101, 'float', 0.00, 0.00, -60.00, 0.00, 21255.06, 55.00], { maxDuration : 3000});
    }
  }

  render() {

    const {children} = this.props;

    return (

      <div className={styles.wrapper}>
        <div ref={(e) => this.map = e} style={{'width': '100vw', 'height': '100vh'}}></div>

        <div className={styles.children}>
          {children}
        </div>
      </div>);
  }
}

MapBackground.defaultProps = {}

export default MapBackground;
