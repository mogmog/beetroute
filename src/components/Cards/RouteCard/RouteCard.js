import React, {Component} from 'react';
import {SegmentedControl, Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import CustomEditor from "./CustomEditorOld";

class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: this.props.data.data };

  }

  onChange(editorState) {
    this.setState({editorState})
  }

  render() {

    const { pageActions, index } = this.props;

    const {editorState, modal} = this.state;

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.4)' }}>

          <Card.Body style={{padding : 0, height : '320px'}}>
              <CustomEditor index={index} onGeoChange={pageActions.onGeoChange} onTextChange={pageActions.updateText} data={editorState} />
          </Card.Body>
        </Card>

      </div>);
  }
}

RouteCard.defaultProps = {
  data: {},
}

export default RouteCard;
