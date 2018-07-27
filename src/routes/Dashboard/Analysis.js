import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Button
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import {getTimeDistance} from '../../utils/utils';

import {Motion, spring} from 'react-motion';

import styles from './Analysis.less';

import CardJSONEditor from "components/CardJSONEditor/CardJSONEditor";
import CardLoader from "components/CardLoader/CardLoader";
import Facebook from "../../components/Content/Facebook/Facebook";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Yuan = ({children}) => (
  <span
    dangerouslySetInnerHTML={{__html: yuan(children)}} /* eslint-disable-line react/no-danger */
  />
);

@connect((namespaces) => {

  return {
    targetgroup: namespaces.targetgroup,
    card: namespaces.card,
  }
})

export default class Analysis extends Component {
  state = {
    isMobile: false,
    isSqueezed: false
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'targetgroup/fetch',
      payload: {userId: 1}
    });
  }

  handlePageSqueeze() {
    this.setState({isSqueezed: !this.state.isSqueezed});
  }

  loadTargetGroup(targetgroup) {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchquestioncards',
      payload: {userId: 1, key: {'type' : 'targetgroup', id: targetgroup.id}}
    }).then((x)=> {
      this.forceUpdate();
    });
  }




  render() {

    const mentionUsers = [
      {
        name: 'Steven Iseki',
        link: 'https://github.com/steveniseki',
        avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
      },
      {
        name: 'Nik Graf',
        link: 'https://github.com/nikgraf',
        avatar: 'https://avatars2.githubusercontent.com/u/223045?v=3&s=400',
      }
    ]

    const {isSqueezed} = this.state;
    const {targetgroup, card} = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: {marginBottom: 24},
    };

    return (
      <div className={styles.flexboxlayout}>



        <div>
          <div id="container" className="flexcanvas flexChild columnParent">

            <div id="columnChild82623" className="flexChild rounded bordered">
              TOP BAR
            </div>

            <div id="columnChild9707" className="flexChild rowParent">
              <div id="rowChild30953" className="flexChild rowParent">


                <Motion key={1} style={{width: spring(isSqueezed ? 100 : 300)}}>
                  {
                    ({width}) => (

                      <div style={{'width': width}} id="rowChild19929" className="flexChild rounded bordered">

                        <ul style={{'list-style': 'none'}}>
                          {targetgroup.list.map((tg) => <li onClick={(e) => {
                            this.loadTargetGroup(tg)
                          }}>{tg.name}</li>)}
                        </ul>
                      </div>

                    )}
                </Motion>

                <Motion key={2} style={{width: spring(isSqueezed ? 500 : 750)}}>
                  {
                    ({width}) => (
                      <div style={{'width': `${width}px`}} id="rowChild14954" className="flexChild rounded bordered">
                        <CardLoader pageActions={{'handlePageSqueeze' : this.handlePageSqueeze.bind(this)}} data={card.questioncards.length ? card.questioncards[0].data : undefined} card={'HeadlineCard'}/>

                        <Button onClick={this.handlePageSqueeze.bind(this)}>Toggle</Button>

                      </div>)
                  }

                </Motion>

                <div style={{'position': 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                  <Motion key={3} style={{tween: spring((isSqueezed ? 0 : 100), {stiffness: 190, damping: 46})}}>
                    {
                      ({tween}) => (
                        <div style={{
                          'position': 'absolute',
                          width: '100%',
                          height: '98%',
                          'transform': 'translateX(' + tween + '%)',
                          'width': 600
                        }} id="rowChild19929" className="flexChild columnParent bordered rounded">
                          <Facebook />

                          <Facebook />

                          <Facebook />

                          <Facebook />

                          <Facebook />
                        </div>)

                    }

                  </Motion>
                </div>
              </div>

              <Motion key={4} style={{width: spring(isSqueezed ? 400 : 500)}}>
                {
                  ({width}) => (
                    <div style={{'width': width}} id="rowChild12611" className="flexChild columnParent">
                      <div id="columnChild20412" className="flexChild columnParent">
                        <div id="columnChild2978" className="flexChild rounded bordered"></div>

                        <div id="columnChild44776" className="flexChild rowParent">
                          <div id="rowChild65574" className="flexChild rounded bordered"></div>

                          <div id="rowChild66891" className="flexChild rounded bordered"></div>
                        </div>
                      </div>

                      <div id="columnChild87347" className="flexChild rounded bordered"></div>
                    </div>)

                }

              </Motion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
