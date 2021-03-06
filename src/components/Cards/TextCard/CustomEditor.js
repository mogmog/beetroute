import React from "react";
import Quill from 'quill';
import styles from './CustomEditor.less';
import { Button, Modal } from 'antd-mobile';
import {EXIF} from 'exif-js';
import ImageUploader from 'react-images-upload';

function getExif() {
  var img1 = document.getElementById("img1");
  EXIF.getData(img1, function() {
    var make = EXIF.getTag(this, "Make");
    var model = EXIF.getTag(this, "Model");
    var makeAndModel = document.getElementById("makeAndModel");
    makeAndModel.innerHTML = `${make} ${model}`;
  });
  var img2 = document.getElementById("img2");
  EXIF.getData(img2, function() {
    var allMetaData = EXIF.getAllTags(this);
    var allMetaDataSpan = document.getElementById("allMetaDataSpan");
    allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
  });
  var img3 = document.getElementById("img3");
  // EXIF.enableXmp();
  EXIF.getData(img3, function() {
    var allMetaData = EXIF.getAllTags(this);
    var img3WithXmpMetaData = document.getElementById("img3WithXmpMetaData");
    img3WithXmpMetaData.innerHTML = JSON.stringify(allMetaData, null, "\t");
  });
}

class Editor extends React.Component {
  constructor() {
    super();
    this.editor = null;

    this.state = { };
  }

  componentDidMount() {

    const { onTextChange, index, toolbarOptions, isAdmin } = this.props;



    var quill = new Quill(this.editor, {
      readOnly: !isAdmin,
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: '...',
      theme: 'snow',
    });

    quill.on('text-change', function() {
      onTextChange(index, quill.getContents());
    });

    quill.setContents(this.props.data);

    //quill.focus();

  }



  render() {
    return (
      <div className={styles.customeditor }>
        <div ref={editor => this.editor = editor} id="test"  ></div>
      </div>
    );
  }
}

Editor.defaultProps = { toolbarOptions : false }
export default Editor;
