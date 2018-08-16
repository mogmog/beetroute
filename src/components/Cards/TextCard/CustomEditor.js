import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import PropTypes from 'prop-types';
import GeoLocate from './geolocate';

export default class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml:  { ops: [ { insert: '  ' } ]
      } };
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(html);
  }

  render() {
    return (
      <div className="text-editor">

          <ReactQuill
            id={'quill_' + this.props.data.id}
            value={this.state.editorHtml}
            onChange={this.handleChange.bind(this)}
            modules={CustomEditor.modules}
            formats={CustomEditor.formats}
            theme={"snow"} // pass false to use minimal theme
          />

      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
// CustomEditor.modules = {
//   toolbar: {
//     container: "#toolbar",
//   }
// };

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
CustomEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
  "color"
];

/*
 * PropType validation
 */
CustomEditor.propTypes = {
  placeholder: PropTypes.string
};
