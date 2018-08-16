import React, {Component} from 'react';
import {SegmentedControl, Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import CustomEditor from "./CustomEditorOld";

class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: this.props.data.data, instagram: this.props.data.instagram };

  }

  onChange(editorState) {
    this.setState({editorState})
  }

  render() {

    const { pageActions, index, data } = this.props;

    const {editorState, instagram} = this.state;

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.7)' }}>

          <Card.Body style={{'paddingTop' : '20px', height : '57vh', 'textAlign' :'center'}}>

            { !data.instagram && <Button onClick={pageActions.addInstagram }> Add Instagram </Button> }
              { data.instagram && <img style={{ opacity : 0.8, width : '325px', height : '325px'}} alt="something" src={data.instagram.images.standard_resolution.url} />}

              <div style={{width: '80%', position : 'absolute', bottom : '0%'  }}>
              <CustomEditor index={index} onGeoChange={pageActions.onGeoChange} onTextChange={pageActions.updateText} data={editorState} />
              </div>
          </Card.Body>
        </Card>

      </div>);
  }
}

RouteCard.defaultProps = {
  data: {},
}

export default RouteCard;
