import React, {Component, Fragment} from 'react';
import  ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import Throttle from 'lodash-decorators/throttle';
import {Flex, Carousel, Icon, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { PullToRefresh, ListView  } from 'antd-mobile';



function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

const PlaceHolder = ({className = '', ...restProps}) => (
  <div className={`${className} placeholder`} {...restProps}>{restProps.children}</div>
);

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

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
    showCards: true,
    hasOpenCard : false,

    slideIndex: 0,

    selectedTab: 'blueTab',
    hidden: false,
    fullScreen: true,

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

  setCameraMode() {
    this.setState({showCards: false});
  }

  onCameraChange(e) {
    this.position = e;
  }

//test
  save() {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/updatequestioncard',
      payload: {"card": this.props.card.questioncards[this.state.slideIndex], camera: this.position},
    }).then((e) => {
      dispatch({
        type: 'card/fetchquestioncards',
        payload: {userId: 1, type: 'daycard'},
      });

    });


    this.showSave  = false;

  }

  componentDidUpdate() {
  }

  renderContent(pageText, showCards, slideIndex) {

    const {card} = this.props;

    //return (<span> test </span>);

    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>






      </div>
    );
  }


  render() {

    const {card, gpstracking} = this.props;
    const {showCards, slideIndex, hasOpenCard} = this.state;

    console.log(gpstracking);

    const thing = gpstracking.waypoints.map((x) => [x.longitude, x.latitude ]);

    const extra = (

      <div>
        <Flex wrap="wrap">
          <PlaceHolder className="inline">
            <Button type={'primary'} onClick={this.save.bind(this)}>
              SAVE { hasOpenCard && <span>hasOpenCard</span>}
            </Button>
          </PlaceHolder>
          <PlaceHolder className="inline"/>

        </Flex>


      </div>
    );

    return (
      <div className='top'>

        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="Life"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'blueTab'}
              badge={1}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
              data-seed="logId"
            >


              {card.questioncards.length &&
              <MapBackground onCameraChange={this.onCameraChange.bind(this)} slideIndex={slideIndex} cards={card.questioncards} waypoints={thing}>
                { <div className={styles.children}>

                  <Carousel
                    autoplay={false}
                    slideWidth={0.9}
                    dragging={!hasOpenCard}
                    swiping={!hasOpenCard}
                    afterChange={(to) => {
                      this.setState({slideIndex: (to || 0)})
                    }}
                  >

                    {card.questioncards.map((card, index) =>
                      <CardLoader setHasOpenCard={this.setHasOpenCard.bind(this)} extra={ extra } key={index} index={index} card={'RouteCard'} />
                    )}

                  </Carousel>

                </div>}

              </MapBackground>}

            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Koubei"
              key="Koubei"
              badge={'new'}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei', showCards, slideIndex)}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              {this.renderContent('Friend', showCards, slideIndex)}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="My"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              {this.renderContent('My', showCards, slideIndex)}
            </TabBar.Item>
          </TabBar>
        </div>

      </div>
    );

  }
}
