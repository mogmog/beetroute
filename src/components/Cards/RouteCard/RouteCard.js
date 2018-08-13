import React, {Component} from 'react';
import {SegmentedControl, Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import CustomEditor from "./CustomEditor";

class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: '', type: ''};

  }

  onChange(value) {
    this.setState({value})
  }

  render() {

    const {data, onClick, extra, clickevents, index, open, onSwipeDown, onVerticalChange, setToolbar} = this.props;

    const {editorState, modal} = this.state;

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>

          <Card.Body style={{padding : 0}}>

            {this.state.type === '' && <div>
            <Button onClick={(e)=> this.setState({type : 'text'})}>Text {data.id}</Button>
            <WhiteSpace/>
            <Button onClick={(e)=> this.setState({type : 'photo'})}>Photo</Button>
            <WhiteSpace/>
            <Button>Spacer</Button>
            </div>}

            {this.state.type == 'text' &&
            <div>
              <CustomEditor data={data} />
             {/* <Button onClick={(e) => this.setState({modal: false, type: 'text'})}>Save</Button>*/}
            </div>}



          </Card.Body>
        </Card>

      </div>);
  }
}

RouteCard.defaultProps = {
  data: {},
}

export default RouteCard;
