import React, {Component} from 'react';
import { Card, Button } from 'antd-mobile';
import CustomEditor from "./../TextCard/CustomEditor";

class InstagramCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: this.props.data.data, instagram: this.props.data.instagram };
  }

  onChange(editorState) {
    this.setState({editorState})
  }

  render() {

    const { pageActions, index, data, isAdmin } = this.props;

    const {editorState } = this.state;

    return (

      <div>

        <Card style={{backgroundColor: 'rgba(255,255,255,0.8)' }}>

          <Card.Body style={{'paddingTop' : '20px', height : '57vh', 'textAlign' :'center'}}>

            { !data.instagram && <Button onClick={pageActions.addInstagram }> Add Instagram </Button> }

            { data.instagram && data.instagram.type === 'image' && <img style={{ opacity : 0.85, width : '96%', height : 'auto'}} alt="something" src={data.instagram.images.standard_resolution.url} />}

            { data.instagram && data.instagram.type === 'video' &&  <video width="96%" height="auto" controls> <source src={data.instagram.videos.standard_resolution.url} type="video/mp4"/> </video>}

            <div style={{height : '10%' }}>
              <CustomEditor isAdmin={isAdmin} index={index} onTextChange={pageActions.updateText} data={editorState} />
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
