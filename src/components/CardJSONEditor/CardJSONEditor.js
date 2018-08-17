import React, {Component} from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { Button } from 'antd-mobile';

class CardJSONEditor extends Component {

  constructor(props) {
    super();

    this.state = {
      card : props.card
    };
  }

  handleChange (card){
    this.setState({card: card});
  }

  render() {

    const { card } = this.state;
    const {saveJSON} = this.props;

    return (
      <div className="App">

        <Editor
          value={card}
          onChange={this.handleChange.bind(this)}
        />

        <Button onClick={(e) => { saveJSON(card) }}>Save</Button>

      </div>
    );
  }
}

export default CardJSONEditor;
