import React, {Component} from 'react';
import { Card, Button } from 'antd-mobile';
import CustomEditor from "./../TextCard/CustomEditorOld";

class InstagramCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: this.props.data.data, instagram: this.props.data.instagram };
  }

  onChange(editorState) {
    this.setState({editorState})
  }

  render() {

    const { pageActions, index, data } = this.props;

    const {editorState } = this.state;

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.7)' }}>

          <Card.Body style={{'paddingTop' : '20px', height : '57vh', 'textAlign' :'center'}}>

            { !data.instagram && <Button onClick={pageActions.addInstagram }> Add Instagram </Button> }

            { data.instagram && <img style={{ opacity : 0.8, width : '96%', height : 'auto'}} alt="something" src={data.instagram.images.standard_resolution.url} />}

            <div style={{height : '10%' }}>
              <CustomEditor index={index} onTextChange={pageActions.updateText} data={editorState} />
            </div>
          </Card.Body>
        </Card>

      </div>);
  }
}

InstagramCard.defaultProps = {
  data: {},
}

export default InstagramCard;