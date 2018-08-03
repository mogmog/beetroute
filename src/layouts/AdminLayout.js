import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import Throttle from 'lodash-decorators/throttle';
import {Flex, Carousel, Icon, Button, WhiteSpace, WingBlank} from 'antd-mobile';


const PlaceHolder = ({className = '', ...restProps}) => (
  <div className={`${className} placeholder`} {...restProps}>{restProps.children}</div>
);

import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";
import styles from './AdminLayout.less';

@connect((namespaces) => {

  return {
    card: namespaces.card,
  }
})

export default class Admin extends Component {

  position = undefined;

  state = {
    showCards: true,
    imgHeight: '100%',
    slideIndex: 0,
    card: {camera: []},
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, type: 'daycard'},
    });
  }

  setCameraMode() {
    this.setState({showCards: false});
  }

  onCameraChange(e) {
    const {dispatch} = this.props;


    const a = () => {
console.log(1);
      if (JSON.stringify(this.props.card.questioncards[this.state.slideIndex].camera) !==  JSON.stringify(e)) {

        dispatch({
          type: 'card/updatequestioncard',
          payload: {"card": this.props.card.questioncards[this.state.slideIndex], camera: e},
        }).then(x => {

          // dispatch({
          //   type: 'card/fetchquestioncards',
          //   payload: {userId: 1, type: 'daycard'},
          // });

        });
      }
      }

    a();

      this.state.position = e;


  }

//test
  save() {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/updatequestioncard',
      payload: {"card": this.state.card, camera: this.state.position},
    });

    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, type: 'daycard'},
    });


  }

  render() {

    const {card} = this.props;
    const {showCards, slideIndex} = this.state;

    const extra = (

      <div>
        <Flex wrap="wrap">
          <PlaceHolder className="inline">
            <Button type={'primary'} onClick={this.save.bind(this)}>
              Use this location on other card ..
            </Button>
          </PlaceHolder>
          <PlaceHolder className="inline"/>

        </Flex>


      </div>
    );


    return (
      <div className='top'>

        {card.questioncards.length &&
        <MapBackground onCameraChange={this.onCameraChange.bind(this)} slideIndex={slideIndex}
                       cards={card.questioncards}>
          {showCards && <div className={styles.children}>

            <Carousel
              autoplay={false}
              slideWidth={0.9}
              card={card.questioncards[slideIndex]}
              beforeChange={(from, to) => console.log(from)}
              afterChange={(to, from) => {
                this.setState({slideIndex: (to || 0)})
               // this.setState({card : card.questioncards[to]});
              }}
            >

              {card.questioncards.map((card, index) => <CardLoader extra={extra} key={index} index={index}
                                                                   card={'PictureCard'}/>)}

            </Carousel>

          </div>}

        </MapBackground>}
      </div>
    );

  }
}
