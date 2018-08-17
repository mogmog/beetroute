import React, {Component} from 'react';
import {SegmentedControl, Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import CustomEditor from "./CustomEditor";

class TextCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: this.props.data.data, instagram: this.props.data.instagram };

  }

  onChange(editorState) {
    this.setState({editorState})
  }

  render() {

    const { pageActions, index, data, isAdmin } = this.props;

    const {editorState, instagram} = this.state;

    const  toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [ { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, false] }],
      [ 'link' ],          // add's image support
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
    ];

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.7)' }}>

          <Card.Body style={{'paddingTop' : '20px', height : '57vh', 'textAlign' :'center'}}>
              <div>
              <CustomEditor isAdmin={isAdmin} toolbarOptions={isAdmin ? toolbarOptions : false } index={index} onTextChange={pageActions.updateText} data={editorState} />
              </div>
          </Card.Body>
        </Card>

      </div>);
  }
}

TextCard.defaultProps = {
  data: {},
}

export default TextCard;
