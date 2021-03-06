import React, {Component} from 'react';
import styles from './styles.css';

let pinModelUnSelected, pinModelSelected;

class MapBackground extends Component {
  constructor(props) {
    super(props);
    this.isInitialPan = true;
    this.state = {waypointsToShow : []};
  }

  componentDidMount() {

    this.browser = window.vts.browser(this.map, {
      map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-map/mapConfig.json',
      position : ["obj", -0.0588082, 51.5675886, "float", 0, 10, -90, 0, 27308, 55]
    });

    const that = this;
    this.browser.on('map-loaded', loadGEOJSON);
    const wayPoints = this.waypoints;

    function loadGEOJSON() {

      const map = that.browser.map;
      const renderer = that.browser.renderer;

      that.browser.mapMobileModeAutodect = false;
      that.browser.mapMobileMode = false;
      that.browser.mapAllowLowres = false;
      /*that.browser.mapMobileTexelDegradation = 150;
      that.browser.rendererAntialiasing = false;
      that.browser.mapDownloadThreads = 3;
      that.browser.mapNavSamplesPerViewExtent = 4;
      that.browser.mapTexelSizeFit = 0.2;*/


      pinModelSelected = new window.ModelOBJ(map, renderer, { path:'/marker.obj' });
      pinModelUnSelected = new window.ModelOBJ(map, renderer, { path:'/transparent_marker.obj' });

      map.addRenderSlot('custom-render', onCustomRender, true);
      map.moveRenderSlotAfter('after-map-render', 'custom-render');

      function onCustomRender() {

        let done = false;
        const smaller = that.props.waypoints;

        that.props.cards.forEach((card, index) => {

          if (pinModelSelected && pinModelSelected.ready && pinModelUnSelected && pinModelUnSelected.ready) {

            if (index > 0) {



              const markerHeight = that.browser.map.getSurfaceHeight([card.marker[1], card.marker[2]])[0] + card.markerOptions.heightOffset;

              if (index === that.props.slideIndex) {
                pinModelSelected.draw({
                  navCoords: [card.marker[1], card.marker[2], markerHeight],
                  heightMode: 'float',
                  scale: card.markerOptions.rotation,
                  scale: card.markerOptions.scale,
                  ambientLight: [0,0,0]
                });
              } else {
                pinModelUnSelected.draw({
                  navCoords: [card.marker[1], card.marker[2], markerHeight],
                  heightMode: 'float',
                  rotation: card.markerOptions.rotation,
                  scale: card.markerOptions.scale,
                  ambientLight: [0,0,0]
                });
              }

            }
          }
        });

        // if (pinModelSelected && pinModelSelected.ready) {
        //   pinModelSelected.draw({
        //     navCoords: [1.4386666666666668, 38.90983333333333, 28.5],
        //     heightMode: 'float',
        //     rotation: [0,0,0],
        //     scale: [500,500,500],
        //     ambientLight: [90,90,90],
        //   });
        // }

        // if (pinModel && pinModel.ready) {
        //   pinModel.draw({
        //     navCoords: [1.4386666666666668, 38.50983333333333, 28.5],
        //     heightMode: 'float',
        //     rotation: [0,0,0],
        //     scale: [500,500,500],
        //     ambientLight: [90,90,90],
        //   });
        // }

          // var points = new Array(smaller.length);
          //
          // for (var i = 0; i < smaller.length; i++) {
          //   points[i] = map.convertCoordsFromNavToCanvas(smaller[i], 'float');
          // }
          // renderer.drawLineString({
          //   points : points,
          //   size : 5.0,
          //   color : [248,222,126, 125],
          //   depthTest : true,
          //   depthOffset : [0,0,-7],
          //   blend : true
          // });
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


if (this.props.cards[this.props.slideIndex] !== undefined) {



  //TODO next line is causing the bug where the first slide wont update
  if (this.props.slideIndex !== prevProps.slideIndex) {
    this.browser.autopilot.flyTo(this.props.cards[this.props.slideIndex].camera, this.props.cards[this.props.slideIndex].cameraOptions);
    if (this.props.cards[this.props.slideIndex].cameraOptions.rotate) this.browser.autopilot.setAutorotate(-4);
  }

}






  }

  render() {

    const {children} = this.props;

    return (

      <div className={styles.wrapper}>
        <div ref={(e) => this.map = e} style={{'height': '100vh', 'width': '100vw'}}></div>
        {children}
      </div>);
  }
}

MapBackground.defaultProps = {}

export default MapBackground;
