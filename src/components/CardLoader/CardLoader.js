import React, {Component} from 'react';

import InstagramCard from '../Cards/InstagramCard/InstagramCard';
import TextCard from '../Cards/TextCard/TextCard';

const mappings = {
  'TextCard' : TextCard,
  'InstagramCard' : InstagramCard,
}

class CardLoader extends Component {

  constructor(props) {
    super();
    this.mappings = mappings;
  }


  render() {

    const {extra, index, card, pageActions, data, clickevents, isAdmin} = this.props;

    const DynamicCard = mappings[card];

    if (!DynamicCard) return <span>No card defined in card loader</span>;

    return (
      <DynamicCard isAdmin={isAdmin} index={index} pageActions={ pageActions } data={ data } clickevents={clickevents} extra={extra}  />
    );
  }
}

export function getMappings() {
  return mappings;
}

export default CardLoader;
