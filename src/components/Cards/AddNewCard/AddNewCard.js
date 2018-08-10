import {connect} from 'dva';
import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';

@connect((namespaces) => {
  return {
    card: namespaces.card,
  }
})

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = { modal : false };
  }

  render() {


    const {data, onClick, extra, clickevents, index, open, onSwipeDown, onVerticalChange, addCard} = this.props;

    const {modal, currentThing} = this.state;

    return (

      <div>

        <Modal wrapClassName='transparent' style={{background : 'none'}} getContainer={()=> document.getElementById('items')} visible={ modal } bodyStyle={{'backgroundColor': 'rgba(0,0,0,0)', margin : '13%'}}>
          <Button onClick={(e) => {addCard('TextCard'); this.setState({modal : false})}}> TEXT</Button>
          <WhiteSpace/>
          <Button onClick={addCard}> IG</Button>
          <WhiteSpace/>
          <Button onClick={addCard}> Video</Button>
          <WhiteSpace/>
          <Button onClick={addCard}> ROUTE</Button>
        </Modal>

        <Card style={{backgroundColor : 'rgba(255,255,255,0.4)'}}>

          <Card.Body>
           <Button onClick={(e)=> {this.setState({modal : true })} }>ADD NEW CARD</Button>
          </Card.Body>
        </Card>

      </div>);
  }
}

AddNewCard.defaultProps = {
  data: {},
}

export default AddNewCard;
