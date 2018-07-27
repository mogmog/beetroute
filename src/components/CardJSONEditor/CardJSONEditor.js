import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal, Tabs, Icon, Avatar, Table} from 'antd';

const { Meta } = Card;

import {render} from "react-dom";
import CardLoader from "../../components/CardLoader/CardLoader";
import CardChecks from "../CardChecks/CardChecks";

const TabPane = Tabs.TabPane;

var CodeMirror = require('react-codemirror');

require('codemirror/lib/codemirror.css');

class CardJSONEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { editvisible : false, checksvisible : false, card : (this.props.card) };
  }

  async componentDidMount() {
    /*get the schema for the appropriate card */
    try {
      const schema = await import('./../Cards/' + this.props.card.component + '/schema');
      this.setState({schema});
    } catch (e) {

    }
  }

  updateCode(newCode) {

    var card = {...this.state.card};

    /*If user is typing, JSON parsing might fail*/
    try {
      card.data = JSON.parse(newCode);
    } catch (e) {
    }
//
    this.setState({card});
  }

  handleOK() {
    const {dispatch} = this.props;

    //persistquestioncard
    dispatch({
      type: 'card/persistquestioncard',
      payload: this.state.card
    });

    dispatch({
      type: 'cardpositions/fetchcardpositions',
      payload: {'userId' : 1, 'type': 'question', 'id': 1}
    });

    this.setState({editvisible : false});

  }

  showEdit() {

    const {dispatch} = this.props;

    this.setState({"editvisible": !this.state.editvisible});
  }

  showChecks() {
    this.setState({'checksvisible': !this.state.checksvisible});
  }

  render() {

    //return (this.props.children);

    const { isEmpty } = this.props;
    const { formData, activeKey, editvisible, checksvisible, card, schema } = this.state;

    const options = {lineNumbers: false, mode : 'json' };

    const editmodal = (<Modal bodyStyle={{height : '50vh'}} visible={editvisible} footer={[
      <Button key="submit" type="primary" onClick={this.handleOK.bind(this)}>
        Save
      </Button>,
    ]} width={'90vw'} onCancel={this.showEdit.bind(this)}>

      <Row >
        <Col span={10} >

          <Tabs defaultActiveKey="1">
            <TabPane tab="Data"   key="1">  <CodeMirror value={JSON.stringify(card.data, null, '\t')} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
            <TabPane tab="Schema" key="2">  <CodeMirror value={JSON.stringify(schema, null, '\t')} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
          </Tabs>

        </Col>

        <Col span={12} push={2}>
          <CardLoader card={ card }/>
        </Col>

      </Row>

    </Modal>);

    return (<div><Card bodyStyle={{padding : 0, margin : 0}} actions={[<Icon type="edit" onClick={this.showEdit.bind(this)} />, <Icon type="check-square-o" onClick={this.showChecks.bind(this)}/>, <Icon type="ellipsis" />]} >
      {this.props.children}
    </Card> {editmodal} <CardChecks checksvisible={checksvisible}/></div>);
  }
}

export default CardJSONEditor;
