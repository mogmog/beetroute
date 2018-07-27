import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal, Tabs, Icon, Avatar, Table, Carousel} from 'antd';
import CardLoader from '../CardLoader/CardLoader';
import {getMappings} from '../CardLoader/CardLoader';

const { Meta } = Card;

import './NewCard.css';

class NewCard extends Component {

  constructor(props) {
    super(props);
    this.state = { newcardmodalvisible : false };
  }

  showNewModal() {
    this.setState({newcardmodalvisible : !this.state.newcardmodalvisible});
  }

  createNewCard(component, position) {
    const { dispatch, card } = this.props;

    const cc = getMappings()[component];

    console.log(cc);

   dispatch({
      type: 'card/createquestioncard',
      payload: {component : component, key : {type : 'question', id : 1}, data : new cc().sample}
    }).then(()=> {

     const newcardid = this.props.card.card.id;
     alert(newcardid);

     dispatch({
       type: 'cardpositions/createcardposition',
       payload: {position : position, cardId : newcardid, key : {type : 'question', id : 1}}
     })

   });



  }

  render() {

    const { newcardmodalvisible }  = this.state;
    const { position }    = this.props;

    const newcardmodal = (<Modal bodyStyle={{height : '50vh'}} visible={newcardmodalvisible} footer={[]} width={'60vw'} onCancel={this.showNewModal.bind(this)} >

      <Row gutter={24}>

          {
            Object.keys(getMappings()).map((e) =>  <Col span={8} key={e}><Card key={e} actions={[<Button onClick={(ee)=>{this.createNewCard(e, position)} }>Add {e}</Button>]}><CardLoader key={e} card={{component : e}}></CardLoader></Card></Col>)
          }

      </Row>

    </Modal>);


    return (<Card bordered={false} style={{ opacity : 0.5 }}>

      <Row>
        <Col span={10}>
        </Col>

        <Col span={4}>
          <Button shape="circle" icon="plus" type={'primary'} onClick={this.showNewModal.bind(this)}/>
        </Col>

        <Col span={10}>
        </Col>

      </Row>

      {newcardmodal}

    </Card>);
  }
}

export default NewCard;
