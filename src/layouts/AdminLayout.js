import React, {Component, Fragment} from 'react';
import  ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import Throttle from 'lodash-decorators/throttle';

import { HtmlEditor, MenuBar  } from '@aeaton/react-prosemirror'

import {Flex, Carousel, Icon, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { PullToRefresh, ListView  , Popover, NavBar} from 'antd-mobile';

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";
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

  onSelect (opt) {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });

    this.addCard(opt.props.value);
  }
  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };

  setHasOpenCard(thing) {
    this.setState({hasOpenCard : thing});
  }

  onCameraChange(position) {
    console.log("onCameraChange");
    this.setState({ position });
  }

  next() {

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

  addCard(component) {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/createquestioncard',
      payload: {component, camera : this.props.card.questioncards[this.state.selectedIndex].camera },
    }).then((e) => {
      dispatch({
        type: 'card/fetchquestioncards',
        payload: {userId: 1, type: 'daycard'},
      });
    })
  }


  componentDidUpdate() {

    //console.log("componentDidUpdate");
    if (this.state.selectedIndex !== this.props.card.questioncards.length - 1) {
      /* eslint react/no-did-update-set-state: 0 */
      //this.setState({ selectedIndex: this.props.card.questioncards.length - 1 });
    }

  }

  setToolbar(custom_menu, state, dispatch) {
    this.setState({Element : {custom_menu : custom_menu, state : state, dispatch : dispatch }});
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
              <Popover mask
                       overlayClassName="fortest"
                       overlayStyle={{ color: 'currentColor' }}
                       visible={this.state.visible}
                       overlay={[
                         (<Item key="TextCard" value="TextCard" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Add Card</Item> ),
                       ]}
                       align={{
                         overflow: { adjustY: 0, adjustX: 0 },
                         offset: [-10, 0],
                       }}
                       onVisibleChange={this.handleVisibleChange.bind(this)}
                       onSelect={this.onSelect.bind(this)}
              >
                <div style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Icon type="ellipsis" />
                </div>


              </Popover>
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
                  <CardLoader setHasOpenCard={(e) => {}} data={card} extra={ extra } key={index} index={index} card={'RouteCard'} />
                )}

              </Carousel>

            </div>}

          </MapBackground>}


      </div>
    );

  }
}
