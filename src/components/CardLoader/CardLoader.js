import React, {Component} from 'react';

import PictureCard from '../Cards/PictureCard/PictureCard';
import RouteCard from '../Cards/RouteCard/RouteCard';
import AddNewCard from '../Cards/AddNewCard/AddNewCard';

import MapCard from '../Cards/MapCard/MapCard';
import TextCard from '../Cards/TextCard/TextCard';
import CardGrower from "./CardGrower";


const mappings = {
  'PictureCard' : PictureCard,
  'MapCard' : MapCard,
  'TextCard' : TextCard,
  'RouteCard' : RouteCard,
  'AddNewCard' : AddNewCard,
}

class CardLoader extends Component {

  constructor(props) {
    super();
    this.mappings = mappings;
  }

  render() {

    const DynamicCard = mappings[this.props.card];
    const extra = this.props.extra;
    const clickevents = this.props.clickevents;
    const index = this.props.index;
    const setHasOpenCard = this.props.setHasOpenCard;
    const addCard = this.props.addCard;

    //TODO consolidate all of this

    if (!DynamicCard) return <span>No card defined in card loader</span>;

    return (
      <div >
        <CardGrower addCard={addCard} setHasOpenCard={ setHasOpenCard } card={  <DynamicCard index={index} pageActions={this.props.pageActions} data={this.props.data} clickevents={clickevents} extra={extra}  />}>
        </CardGrower>
      </div>
    );
  }
}

export function getMappings() {
  return mappings;
}

export default CardLoader;

//TODO this was an earlier attempt to make this a bit more dynamic as it doesnt require keeping a mapping object

// import React, { Component } from "react";
// import shortid from "shortid";
//
// import NullCard from "../Cards/NullCard/NullCard";
//
// class CardLoader extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loadedComponents: [],
//       components: <NullCard key={shortid.generate()} />
//     };
//   }
//
//   componentDidMount() {
//     const component = this.props.component || 'NullCard';
//     this.addView(component);
//   }
//
//   addView = viewName => {
//
//     import(`./../Cards/${viewName}/${viewName}.js`)
//       .then(Component => {
//         this.setState({
//           component: <Component.default key={shortid.generate()} country={this.props.country} data={this.props.data} />
//         });
//       })
//       .catch(error => {
//
//         alert(`Error loading card ${viewName}`);
//         console.log(error);
//
//         this.setState({
//           component: <NullCard key={shortid.generate()} />
//         });
//       });
//   };
//
//   render() {
//
//     const { component } = this.state;
//
//     return (
//       <div className="CardLoader">
//           {component}
//       </div>
//     );
//   }
// }
//
// export default CardLoader;
