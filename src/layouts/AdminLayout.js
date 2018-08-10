import React, {Component, Fragment} from 'react';
import  ReactDOM from 'react-dom';
import {connect} from 'dva';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import Throttle from 'lodash-decorators/throttle';

import {Flex, Carousel, Icon, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { PullToRefresh, ListView  , Popover, NavBar} from 'antd-mobile';

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;




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
    selectedIndex : 0,

    slideIndex: 0,

    selectedTab: 'blueTab',
    hidden: false,
    fullScreen: true,

    visible: false,
    selected: '',

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

  setCameraMode() {
    this.setState({showCards: false});
  }

  onCameraChange(position) {
    this.setState({ position });
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

  addCard(component) {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/createquestioncard',
      payload: {component, camera : this.state.position},
    }).then((e) => {
      dispatch({
        type: 'card/fetchquestioncards',
        payload: {userId: 1, type: 'daycard'},
      });
    })
  }


  componentDidUpdate() {

    if (this.state.selectedIndex !== this.props.card.questioncards.length - 1) {
      /* eslint react/no-did-update-set-state: 0 */
      this.setState({ selectedIndex: this.props.card.questioncards.length - 1 });
    }

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
console.log("rendering");
    const thing = gpstracking.waypoints.map((x) => [x.longitude, x.latitude ]);

    const extra = (

      <div>
        <Flex wrap="wrap">
            <Button type={'primary'} onClick={this.save.bind(this)}>
              SAVE { hasOpenCard && <span>hasOpenCard</span>}
            </Button>
        </Flex>
      </div>
    );

    return (
      <div className='top'>

          <NavBar
            style={{ backgroundColor: 'rgba(255,255,255,0.2)'}}
            mode="light"
            rightContent={
              <Popover mask
                       overlayClassName="fortest"
                       overlayStyle={{ color: 'currentColor' }}
                       visible={this.state.visible}
                       overlay={[
                         (<Item key="TextCard" value="TextCard" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Add Text</Item>),
                         (<Item key="PhotoCard" value="PhotoCard" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>Add photo</Item>),
                         (<Item key="SpacerCard" value="SpacerCard" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                           <span style={{ marginRight: 5 }}>Add spacer </span>
                         </Item>),
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

          {true && card.questioncards.length &&
          <MapBackground  slideIndex={slideIndex} cards={card.questioncards} waypoints={thing}>
            { <div className={styles.children}>

              <Carousel
                autoplay={false}
                slideWidth={0.9}
                selectedIndex={this.state.selectedIndex}
                dragging={!hasOpenCard}
                swiping={!hasOpenCard}
                afterChange={(to) => {
                  this.setState({slideIndex: (to || 0)})
                }}
              >

                {card.questioncards.map((card, index) =>
                  <CardLoader setHasOpenCard={this.setHasOpenCard.bind(this)} extra={ extra } key={index} index={index} card={'RouteCard'} />
                )}

                 {/*  <CardLoader setHasOpenCard={this.setHasOpenCard.bind(this)} extra={ extra } key={-12} card={'AddNewCard'} />*/}

              </Carousel>

            </div>}

          </MapBackground>}

          {/*<TabBar
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
          </TabBar>*/}
      </div>
    );

  }
}
