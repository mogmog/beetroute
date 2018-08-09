import React, {Component} from 'react';
import styles from './styles.css';
import _ from 'lodash';

//const linePoints = db.coordinates;

class MapBackground extends Component {
  constructor(props) {
    super(props);
    this.isInitialPan = true;
    this.state = {waypointsToShow : []};
  }


  componentDidMount() {

    this.browser = window.vts.browser(this.map, {
      map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-map/mapConfig.json',
    });

    const that = this;
    this.browser.on('map-loaded', loadGEOJSON);
    const wayPoints = this.waypoints;

    function loadGEOJSON() {

      const map = that.browser.map;
      let thing = 0;

      const renderer = that.browser.renderer;

      map.addRenderSlot('custom-render', onCustomRender, true);
      map.moveRenderSlotAfter('after-map-render', 'custom-render');

      function onCustomRender() {

          const smaller = that.props.waypoints;

          var points = new Array(smaller.length);

          for (var i = 0; i < smaller.length; i++) {
            points[i] = map.convertCoordsFromNavToCanvas(smaller[i], 'float');
          }

          //draw line
          renderer.drawLineString({
            points : points,
            size : 5.0,
            color : [248,222,126, 125],
            depthTest : true,
            depthOffset : [0,0,-7],
            blend : true
          });

      }




    }

    const onPointerUp = (e) => {
      // console.log(this.browser.map.getPosition());
      if (this.browser.map) that.props.onCameraChange(this.browser.map.getPosition().pos);
    };

    this.map.addEventListener("mouseup", onPointerUp);
    this.map.addEventListener("mousewheel", onPointerUp);
    this.map.addEventListener("touchend", onPointerUp);


  }

  componentDidUpdate(prevProps) {

    console.log(this.props.waypoints);

    //idea - pass entire array of cards, and the index is the only thing that changes.
    //stops crazy setstate stuff hppening
    if ( (this.props.slideIndex === 0 && this.props.cards[this.props.slideIndex].camera && this.props.cards[this.props.slideIndex].camera.length) || (this.props.slideIndex !== prevProps.slideIndex)) {

      if (this.props.cards[this.props.slideIndex].camera && this.props.cards[this.props.slideIndex].camera.length)
        this.browser.autopilot.flyTo(this.props.cards[this.props.slideIndex].camera, {
          maxHeight: 1000,
          maxDuration: 2000,
          mode: 'direct'
        });

       //this.browser.autopilot.setAutorotate(6);
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
