import React, {Component} from 'react';
import { Modifier, EditorState } from 'draft-js';

// Not a real React component – just creates the entities as soon as it is rendered.
class StockSource extends Component {
  componentDidMount() {
    const { editorState, entityType, onComplete } = this.props;

    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const randomStock = DEMO_STOCKS[Math.floor(Math.random() * DEMO_STOCKS.length)];

    // Uses the Draft.js API to create a new entity with the right data.
    const contentWithEntity = content.createEntity(entityType.type, 'IMMUTABLE', {
      stock: randomStock,
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    // We also add some text for the entity to be activated on.
    const text = `$${randomStock}`;

    const newContent = Modifier.replaceText(content, selection, text, null, entityKey);
    const nextState = EditorState.push(editorState, newContent, 'insert-characters');

    onComplete(nextState);
  }

  render() {
    return null;
  }
}


export default StockSource;
