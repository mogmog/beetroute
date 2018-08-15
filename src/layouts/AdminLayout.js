import React, {Component, Fragment} from 'react';
import  ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import { HtmlEditor, MenuBar  } from '@aeaton/react-prosemirror'

import {Flex, Carousel, Icon, Modal, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { PullToRefresh, ListView  , Popover, NavBar} from 'antd-mobile';

const Item = Popover.Item;

import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";
import GeoLocate from '../components/Cards/RouteCard/geolocate';
import styles from './AdminLayout.less';

import {EXIF} from 'exif-js';
import ImageUploader from 'react-images-upload';

@connect((namespaces) => {

  return {
    card: namespaces.card,
    gpstracking : namespaces.gpstracking
  }
})




export default class Admin extends Component {

  showSave = false;

  dropCount = 0;

  state = {
    data: ['1', '2', '3'],
    imgHeight: 350,
    hasOpenCard : false,
    selectedIndex : 0,
    position : undefined,
    slideIndex: 0,
    geohackmodal : false,
  }

  componentDidMount() {

      const {dispatch} = this.props;
      dispatch({
        type: 'card/fetchquestioncards',
        payload: {userId: 1, type: 'daycard'},
      });

    dispatch({
      type: 'gpstracking/fetch',
      payload: {},
    });

    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);

  }

  onCameraChange(position) {
    this.setState({ position });
  }


  updateText(index, delta) {

    const {dispatch, card} = this.props;

    const thecard = card.questioncards[index];

    if (JSON.stringify(thecard.data) !== JSON.stringify(delta)) {

      thecard.data = delta;

      dispatch({
        type: 'card/updatequestioncard',
        payload: { "card": thecard },
      })
    }

  }

  save() {

    const {dispatch} = this.props;
    const from = this.state.slideIndex;

    if (this.props.card.questioncards[this.state.selectedIndex] && this.state.position) {
       dispatch({
        type: 'card/updatequestioncard',
        payload: {"card": this.props.card.questioncards[this.state.selectedIndex], camera: this.state.position},
      }).then((e) => {

        if (false && this.state.selectedIndex < this.props.card.questioncards.length -1) {
          this.setState({selectedIndex : this.state.selectedIndex + 1});
        }
       })
    }
  }


  addCard(component, coords) {

    if (!coords) {

      alert("Addcard - no coords");

    } else {

      this.setState({geohackmodal : false }); /*we either had coords all along, or we now have them from camera */

      const camera = ["obj",coords.longitude, coords.latitude, "float",0,10,-90,0,27308,55];

      const {dispatch} = this.props;

      const defaultCameraOptions = {
        maxHeight: 1000,
        maxDuration: 2000,
        mode: 'direct',
        rotate : false,
      };

      dispatch({
        type: 'card/createquestioncard',
        payload: {component, camera : camera, cameraOptions : defaultCameraOptions },
      }).then(()=> {
        this.setState({selectedIndex : this.state.selectedIndex + 1});
      })

    }
  }

  showModal() {
    this.dropCount = 0;
    this.setState({geohackmodal : true });
  }

  onDrop(picture) {

    const that = this;

    if (that.dropCount === 0) {

      that.dropCount = that.dropCount + 1;

      EXIF.getData(picture[0], function () {
        var exifData = EXIF.pretty(this);
        if (exifData) {

          var exifLong = EXIF.getTag(this, "GPSLongitude");
          var exifLongRef = EXIF.getTag(this, "GPSLongitudeRef");

          var exifLat = EXIF.getTag(this, "GPSLatitude");
          var exifLatRef = EXIF.getTag(this, "GPSLatitudeRef");

          if (exifLatRef === "S") {
            var latitude = (exifLat[0] * -1) + (((exifLat[1] * -60) + (exifLat[2] * -1)) / 3600);
          } else {
            var latitude = exifLat[0] + (((exifLat[1] * 60) + exifLat[2]) / 3600);
          }

          if (exifLongRef === "W") {
            var longitude = (exifLong[0] * -1) + (((exifLong[1] * -60) + (exifLong[2] * -1)) / 3600);
          } else {
            var longitude = exifLong[0] + (((exifLong[1] * 60) + exifLong[2]) / 3600);
          }


          that.addCard("TextCard", {longitude: longitude, latitude: latitude});


        } else {
          alert("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }

  }


  componentDidUpdate() {

    //this is a buggy way to fix the fact that the first card is not setting the position
  /*  if (this.props.card.questioncards.length && this.state.selectedIndex === 0 && !this.state.position) {
      this.setState({position : this.props.card.questioncards[0].camera });
    }*/

    //console.log("componentDidUpdate");
    if (this.state.selectedIndex !== this.props.card.questioncards.length - 1) {
      /* eslint react/no-did-update-set-state: 0 */
      //this.setState({ selectedIndex: this.props.card.questioncards.length - 1 });
    }

  }

  render() {

    const {card, gpstracking} = this.props;
    const {slideIndex, hasOpenCard, position } = this.state;

    const waypoints = gpstracking.waypoints.map((x) => [x.longitude, x.latitude ]);

    console.log("rendering");
    console.log(this.state.geohackmodal);

    const modal = <Modal visible={this.state.geohackmodal}>
                    <ImageUploader
                      withIcon={true}
                      buttonText='Set lat/long from camera'
                      onChange={this.onDrop.bind(this)}
                      imgExtension={['.jpg', '.png' ]}
                      maxFileSize={25242880}
                    />
                  </Modal>

    const extra = (

      <div>
        <Flex wrap="wrap">
            <Button type={'primary'} onClick={this.save.bind(this)}>
              SAVE
            </Button>
        </Flex>
      </div>
    );

    return (
      <div className={styles.top}>

          <NavBar
            style={{ backgroundColor: 'rgba(255,255,255,0.2)'}}
            mode="light"
            leftContent={
              <Button type={'primary'} onClick={ this.save.bind(this)}>
                Save
              </Button>
            }
            rightContent={
              <GeoLocate showModal={this.showModal.bind(this)} addCard={this.addCard.bind(this)}>

              </GeoLocate>
            }
          >


            </NavBar>

          {/*      add this back when camera needs to update cards (if that is a good pattern)  {onCameraChange={this.onCameraChange.bind(this)}}*/}

          <MapBackground onCameraChange={this.onCameraChange.bind(this)} position={position} slideIndex={this.state.selectedIndex} cards={card.questioncards} waypoints={waypoints}>
            { <div className={styles.children}>

              <Carousel
                autoplay={false}
                slideWidth={0.9}
                cellSpacing={10}
                selectedIndex={this.state.selectedIndex}
                dragging={!hasOpenCard}
                swiping={!hasOpenCard}

                beforeChange={(from, to)=> {
                  this.setState({selectedIndex: (to)});
                }}
              >

                {card.questioncards.map((card, index) => (

                    <div style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight }}>
                      <CardLoader pageActions={{updateText : this.updateText.bind(this), updateText : this.updateText.bind(this)}} data={card} extra={ extra } key={index} index={index} card={'RouteCard'} />
                    </div>

                ))}

              </Carousel>

              {modal}

            </div>}

          </MapBackground>


      </div>
    );

  }
}
