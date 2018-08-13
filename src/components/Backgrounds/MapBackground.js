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
      const renderer = that.browser.renderer;

      // that.browser.mapMobileModeAutodect = false;
      //that.browser.mapMobileMode = true;
      /*that.browser.mapMobileTexelDegradation = 150;
      that.browser.rendererAntialiasing = false;
      that.browser.mapDownloadThreads = 3;
      that.browser.mapNavSamplesPerViewExtent = 4;
      that.browser.mapTexelSizeFit = 0.2;*/



      map.addRenderSlot('custom-render', onCustomRender, true);
      map.moveRenderSlotAfter('after-map-render', 'custom-render');


      function onCustomRender() {

        let done = false;
        const smaller = that.props.waypoints;

        if (!done) {
          var points = new Array(smaller.length);

          for (var i = 0; i < smaller.length; i++) {
            points[i] = map.convertCoordsFromNavToCanvas(smaller[i], 'float');
          }
done = true;
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
      if (true && this.browser.map && that.props.onCameraChange) that.props.onCameraChange(this.browser.map.getPosition().pos);
    };

    this.map.addEventListener("mouseup", onPointerUp);
    this.map.addEventListener("mousewheel", onPointerUp);
    this.map.addEventListener("touchend", onPointerUp);


  }

  componentDidUpdate(prevProps) {

    if (this.props.slideIndex !== prevProps.slideIndex) {
      console.log("changed slidEIndex to " + this.props.slideIndex + " to " + prevProps.slideIndex)

      this.browser.autopilot.flyTo(this.props.cards[this.props.slideIndex].camera, {
        maxHeight: 1000,
        maxDuration: 2000,
        mode: 'direct'
      });
    }

    if (false && this.props.cards[this.props.slideIndex] !== undefined) {

      console.log(this.props.slideIndex, prevProps.slideIndex);
      console.log(this.props.cards);
console.log(this.props.cards[this.props.slideIndex].camera);
      if (JSON.stringify(this.props.position) !== JSON.stringify(prevProps.position)) {

      if (this.props.cards[this.props.slideIndex].camera && this.props.cards[this.props.slideIndex].camera.length)
        this.browser.autopilot.flyTo(this.props.cards[this.props.slideIndex].camera, {
          maxHeight: 1000,
          maxDuration: 2000,
          mode: 'direct'
        });

       // this.browser.autopilot.setAutorotate(-4);
      }
    }
  }

  render() {

    const {children} = this.props;

    return (

      <div className={styles.wrapper}>
        <div ref={(e) => this.map = e} style={{'width': '100vw', 'height': '95vh'}}></div>
        {children}
      </div>);
  }
}

MapBackground.defaultProps = {}

export default MapBackground;
