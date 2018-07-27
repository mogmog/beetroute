import React, {Component} from 'react';
import {Button} from 'antd';
import {DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy} from "megadraft";
import 'megadraft/dist/css/megadraft.css';

import LinkEntity from './Entities/LinkEntity';
import {
  Card
} from 'antd';

import EditorWithMentions from './EditorWithMentions';

class CardSaver extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  save() {
    console.log(this.props.data);
  }

  render() {

    return ( <div> <Button onClick={this.save.bind(this)}>I SAVE THINGS</Button>
      {this.props.children}
    </div>);
  }
}

const myDecorator = new DraftJS.CompositeDecorator([
  {
    strategy: createTypeStrategy("LINK"),
    component: LinkEntity,
  },
  {
    strategy: createTypeStrategy("INTERNAL_PAGE_LINK"),
    component: LinkEntity,
  }
])

class EditorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null, myDecorator)};
  }

  onChange = (editorState) => {

    const content = editorStateToJSON(editorState);
    this.setState({editorState});

  }

  render() {

    const {data }= this.props;
    const { content }= this.state;
console.log(content);
    return (<Card> <CardSaver data={ content }>
       {/* <MegadraftEditor editorState={this.state.editorState} onChange={this.onChange}/>*/}
       <EditorWithMentions actions={this.props.actions}></EditorWithMentions>
    </CardSaver></Card>);
  }
}

EditorCard.defaultProps = {
  data: {}
};

export default EditorCard;
