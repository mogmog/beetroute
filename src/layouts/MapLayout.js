import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import {HtmlEditor, MenuBar} from '@aeaton/react-prosemirror'

import Swipeable from 'react-swipeable';

import {Flex, Carousel, Icon, Modal, Button, WhiteSpace, WingBlank, TabBar} from 'antd-mobile';
import {PullToRefresh, ListView, Popover, NavBar} from 'antd-mobile';

import {Motion, spring} from 'react-motion';

import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";
import GeoLocate from '../components/Cards/TextCard/geolocate';
import styles from './MapLayout.less';

import {EXIF} from 'exif-js';
import ImageUploader from 'react-images-upload';
import InstagramChooser from "../components/Instagram/InstagramChooser";
import CardJSONEditor from "../components/CardJSONEditor/CardJSONEditor";

const Item = Popover.Item;

@connect((namespaces) => {

  return {
    card: namespaces.card,
    gpstracking: namespaces.gpstracking,
    instagram: namespaces.instagram
  }
})


export default class Admin extends Component {

  showSave = false;

  dropCount = 0;

  constructor(props) {
    super();

    this.state = {
      position : undefined,
      imgHeight: 410,
      hasOpenCard: false,
      cardsUp: false,
      selectedIndex: 1,
      geohackmodal: false,
      instagrammodal: false,
      jsonmodal : false,
      cardtype: '',
    };
  }

  componentDidMount() {

    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, type: 'daycard'},
    }).then((e) => {
      this.setState({selectedIndex : parseInt(localStorage.getItem('selectedIndex') || 0)})
    });

    dispatch({
      type: 'gpstracking/fetch',
      payload: {},
    });

    dispatch({
      type: 'instagram/fetch',
      payload: {},
    });
  }

  onCameraChange(position) {
    this.setState({position});
  }


  updateText(index, delta) {

    const {dispatch, card} = this.props;

    const thecard = card.questioncards[index];

    if (JSON.stringify(thecard.data) !== JSON.stringify(delta)) {

      thecard.data = delta;

      dispatch({
        type: 'card/updatequestioncard',
        payload: {"card": thecard},
      })
    }

  }

  /*this only updated the camera, not the position*/
  save() {

    const {dispatch} = this.props;
    const from = this.state.slideIndex;

    if (this.props.card.questioncards[this.state.selectedIndex] && this.state.position) {

      const previouscamera = this.props.card.questioncards[this.state.selectedIndex].camera;

      const newcamera = this.state.position;

      dispatch({
        type: 'card/updatequestioncard',
        payload: {"card": this.props.card.questioncards[this.state.selectedIndex], camera: newcamera},
      });
    }
  }

  /*this only updated the camera, not the position*/
  onInstagramSelect(instagram) {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/updatequestioncard',
      payload: {"card": this.props.card.questioncards[this.state.selectedIndex], instagram: instagram},
    })

    this.setState({instagrammodal: false});


  }

  addInstagram() {
    this.setState({instagrammodal: true});
  }


  addCard(component, coords) {

    if (!coords) {

      alert("Error - no coords");

    } else {

      this.setState({geohackmodal: false});
      /*we either had coords all along, or we now have them from camera */

      const camera = ["obj", coords.longitude, coords.latitude, "float", 0, 10, -90, 0, 27308, 55];

      const {dispatch} = this.props;

      const defaultCameraOptions = {
        maxHeight: 1000,
        maxDuration: 1500,
        mode: 'direct',
        rotate: false,
      };

      dispatch({
        type: 'card/createquestioncard',
        payload: {component, marker: camera, camera: camera, cameraOptions: defaultCameraOptions},
      }).then((e) => {

        this.setState({selectedIndex: this.props.card.questioncards.length - 1});
      })


    }
  }

  showModal() {
    this.dropCount = 0;
    this.setState({geohackmodal: true});
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

          that.addCard(that.state.cardtype, {longitude: longitude, latitude: latitude});


        } else {
          alert("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }

  }



  swipedDown() {
    this.setState({cardsUp: false});
  }

  swipedUp() {
    this.setState({cardsUp: true});
  }

  setCardType(type) {
    this.setState({cardtype: type});
  }

  saveJSON(card) {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/updatequestioncard',
      payload: {"card": card},
    })

    this.setState({jsonmodal: false});
    const oldSelectedIndex = this.state.selectedIndex;


  }

  render() {

    const {card, gpstracking, instagram, match} = this.props;
    const {slideIndex, hasOpenCard, position, cardsUp} = this.state;

    const isAdmin = match.path === "/comealive";

    const waypoints = gpstracking.waypoints.map((x) => [x.longitude, x.latitude]);

    const geohackmodal = <Modal visible={this.state.geohackmodal}>
      <ImageUploader
        withIcon={true}
        buttonText='Set lat/long from camera'
        onChange={this.onDrop.bind(this)}
        imgExtension={['.jpg', '.png']}
        maxFileSize={25242880}
      />
    </Modal>

    const instagrammodal = <Modal visible={this.state.instagrammodal}>
      <InstagramChooser onSelect={this.onInstagramSelect.bind(this)} data={instagram.instagram.data}></InstagramChooser>
    </Modal>

    const jsonmodal = (
      <Modal visible={this.state.jsonmodal}>
                        <CardJSONEditor saveJSON={this.saveJSON.bind(this)} card={card.questioncards[this.state.selectedIndex]} />
                      </Modal>
    );

    const extra = (

      <div>
        <Flex wrap="wrap">
          <Button type={'primary'} onClick={this.save.bind(this)}>
            Save camera
          </Button>
        </Flex>
      </div>
    );

    return (
      <div className={styles.top}>

         <MapBackground onCameraChange={this.onCameraChange.bind(this)} position={position} cardsUp={cardsUp}
                       slideIndex={this.state.selectedIndex} cards={card.questioncards} waypoints={waypoints}>


           {isAdmin && <NavBar
              style={{backgroundColor: 'rgba(255,255,255,0.7)', position : 'absolute', top : '0px', width : '100vw'}}
              mode="light"
              leftContent={ [<Button type={'primary'} key={'save'} onClick={this.save.bind(this)}> Save </Button>, <Button type={'secondary'} key={'jsonedit'} onClick={(e) => this.setState({jsonmodal : true})}> JSON </Button> ] }
              rightContent={
                <GeoLocate setCardType={this.setCardType.bind(this)} showModal={this.showModal.bind(this)} addCard={this.addCard.bind(this)}/>
              }
            >

            </NavBar>}

            <Swipeable onSwipedDown={this.swipedDown.bind(this)} onSwipedUp={this.swipedUp.bind(this)}>

              <Motion style={{tween: spring(cardsUp ? 0 : 50)}}>
                {
                  ({tween}) => (

                    <div className={styles.children} style={{'transform': 'translateY(' + tween + '%)'}}>

                      <Carousel
                        autoplay={false}
                        slideWidth={0.9}
                        cellSpacing={10}
                        selectedIndex={this.state.selectedIndex}

                        beforeChange={(from, to) => {
                          localStorage.setItem("selectedIndex", to);
                          this.setState({selectedIndex: (to)});
                        }}
                      >

                        {card.questioncards.map((card, index) => (

                          <div key={'div_' + index} style={{height: this.state.imgHeight}}>
                            <CardLoader pageActions={{
                              addInstagram: this.addInstagram.bind(this),
                              updateText: this.updateText.bind(this)
                            }} isAdmin={isAdmin} data={card} extra={extra} key={index} index={index} card={card.component}/>
                          </div>

                        ))}

                      </Carousel>


                    </div>

                  )}
              </Motion>

            </Swipeable>}

          {geohackmodal}

          {instagrammodal}

          {jsonmodal}

        </MapBackground>

      </div>
    );

  }
}
