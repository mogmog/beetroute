import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Debounce from 'lodash-decorators/debounce';
import {Carousel, Icon, Button, WhiteSpace, WingBlank} from 'antd-mobile';
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
    card: {camera: {}},
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
    this.position = e.position;
  }

//test
  save() {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/updatequestioncard',
      payload: {"card": this.state.card, camera: this.position},
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
      [

        <Button type={'primary'} key={1} onClick={this.save.bind(this)}>
          Save {slideIndex}
        </Button>,

        <Button type={'warning'} key={2}>
          Delete {slideIndex}
        </Button>,

      ]);


    return (
      <div className='top'>

        {card.questioncards.length &&
        <MapBackground onCameraChange={this.onCameraChange.bind(this)} slideIndex={slideIndex}
                       card={card.questioncards[slideIndex]}>
          {showCards && <div className={styles.children}>

            <Carousel
              autoplay={false}
              selectedIndex={0}
              card={card.questioncards[slideIndex]}
              afterChange={(to, from) => {
                this.setState({card: card.questioncards[to]});
                this.setState({slideIndex: (to || 0)})
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
