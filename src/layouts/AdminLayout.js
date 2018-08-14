import React, {Component, Fragment} from 'react';
import  ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import { HtmlEditor, MenuBar  } from '@aeaton/react-prosemirror'

import {Flex, Carousel, Icon, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { PullToRefresh, ListView  , Popover, NavBar} from 'antd-mobile';

const Item = Popover.Item;

import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";
import GeoLocate from '../components/Cards/RouteCard/geolocate';
import styles from './AdminLayout.less';

@connect((namespaces) => {

  return {
    card: namespaces.card,
    gpstracking : namespaces.gpstracking
  }
})




export default class Admin extends Component {

  showSave = false;

  state = {
    hasOpenCard : false,
    selectedIndex : 0,
    position : undefined,
    slideIndex: 0,
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
  }


  componentDidMountX() {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, type: 'daycard'},
    });

  }

  setHasOpenCard(thing) {
    this.setState({hasOpenCard : thing});
  }

  onCameraChange(position) {
    console.log("onCameraChange");
    this.setState({ position });
  }

  next() {

  }

  updateText(index, delta) {
    //alert("shouldnt hapopen at 1645");

    const {dispatch, card} = this.props;

    const thecard = card.questioncards[index];

    console.log(JSON.stringify(thecard.data), JSON.stringify(delta));

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
        if (this.state.selectedIndex < this.props.card.questioncards.length -1) {
          this.setState({selectedIndex : this.state.selectedIndex + 1});
        }
       })
    }
  }

  addCard(component, coords) {

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
                Save and next
              </Button>
            }
            rightContent={
              <GeoLocate addCard={this.addCard.bind(this)}>

              </GeoLocate>
            }
          >


            </NavBar>

          {/*      add this back when camera needs to update cards (if that is a good pattern)  {onCameraChange={this.onCameraChange.bind(this)}}*/}

          {card.questioncards.length &&
          <MapBackground onCameraChange={this.onCameraChange.bind(this)} position={position} slideIndex={this.state.selectedIndex} cards={card.questioncards} waypoints={waypoints}>
            { <div className={styles.children}>

              <Carousel
                autoplay={false}
                slideWidth={0.95}
                selectedIndex={this.state.selectedIndex}
                dragging={!hasOpenCard}
                swiping={!hasOpenCard}

                beforeChange={(from, to)=> {
                  this.setState({selectedIndex: (to)});
                }}
              >

                {card.questioncards.map((card, index) =>
                  <CardLoader pageActions={{updateText : this.updateText.bind(this)}} data={card} extra={ extra } key={index} index={index} card={'RouteCard'} />
                )}

              </Carousel>

            </div>}

          </MapBackground>}


      </div>
    );

  }
}
