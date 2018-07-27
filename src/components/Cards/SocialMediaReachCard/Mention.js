import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import { convertFromRaw, convertToRaw } from 'draft-js';

import editorStyles from './editorStyles.less';
import mentionsStyles from './mentionStyles.css';
import mentions from './mentions';

import {Popover, Tooltip, Icon } from 'antd';

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.length > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform,
    transition,
  };
};

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;


  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>

        <div className={theme.mentionSuggestionsEntryContainerRight}>
          <div className={theme.mentionSuggestionsEntryText}>
            {mention.name}
          </div>

        </div>
      </div>
    </div>
  );
};

export default class CustomMentionEditor extends Component {

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      mentions,
      mentionComponent: (mentionProps) => {

        const content = (
          <div>
            <p>{mentionProps.mention.name} has been sharing this content </p>

            <iframe id="ytplayer" type="text/html" width="400" height="360"
                    src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                    frameborder="0"></iframe>

          </div>
        );

        return (

          <Popover placement="topLeft" content={content} title="Title" trigger="hover">
             <span
               className={mentionProps.className}
               onClick={props.clickevents}
             >
              {mentionProps.children}
            </span>
          </Popover>
      )},
    });
  }

  state = {
    editorState : EditorState.createWithContent(convertFromRaw({"blocks":[{"key":"aod7o","text":"Shabazz Suleman is a bad person in this area.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":15,"key":0}],"data":{}}],"entityMap":{"0":{"type":"mention","mutability":"SEGMENTED","data":{"mention":{"name":"Shabazz Suleman","link":"https://twitter.com/mrussell247","avatar":"https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"}}}}})),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  focus = () => {
    this.editor.focus();
  };

  test() {



    const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );


    console.log(rawDraftContentState);

// convert the raw state back to a useable ContentState object


  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className={editorStyles.editor} onClick={this.focus}>

        <a onClick={this.test.bind(this)}>get state</a>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions

          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          entryComponent={Entry}
        />
      </div>
    );
  }

}
