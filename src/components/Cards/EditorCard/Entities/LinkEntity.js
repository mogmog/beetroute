// MyLinkComponent

import React from "react";

export default ({entityKey, children, contentState}) => {
  const {url} = contentState.getEntity(entityKey).getData();
  return (
    <a className="editor__link" href={url} title={url}>
      FUCK YOU
      {children}
    </a>
  );
};
