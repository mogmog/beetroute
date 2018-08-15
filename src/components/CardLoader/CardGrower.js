import React, {Component} from 'react';
import Swipeable from 'react-swipeable';
import {Motion, spring} from 'react-motion';

import {Card, WingBlank, WhiteSpace, Modal} from 'antd-mobile';

import styles from './CardGrower.less';

class CardGrower extends Component {
  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  componentDidMount() {
    //window.instgrm.Embeds.process();
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }

  swipedDown(e, deltaY, isFlick) {
   // this.setState({open: false})
  }

  swipedUp(e, deltaY, isFlick) {
    this.setState({open: true });
    if (typeof this.props.hasOpenCard === 'function') this.props.hasOpenCard(true);
  }

  onVerticalChange(e, abs) {
     this.setState({open: false});
    if (typeof this.props.hasOpenCard === 'function') this.props.hasOpenCard(false);
  }

  render() {

    const {card} = this.props;


    const {open} = this.state;

    return (

      <div className={styles.grower} style={{'verticalAlign':'bottom', minHeight : '200px', height: 'auto', padding : '5px'}}>

        <Swipeable
        /*  onSwipedUp={this.swipedUp.bind(this)}*/
        >
          <div className={styles.wrapper} >

            <Motion style={{tween: spring(open ? -150 : 0)}}>
              {
                ({tween}) => (

                  <div className={styles.slide} style={{transform : `translate(0,${tween}px)`}}>
                    {React.cloneElement( card, { open: open, onVerticalChange: this.onVerticalChange.bind(this), onSwipeDown: this.swipedDown.bind(this) } )}
                  </div>

                )}
            </Motion>
          </div>
        </Swipeable>




      </div>);
  }
}

export default CardGrower;
