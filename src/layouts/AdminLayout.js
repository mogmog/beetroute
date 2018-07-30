import React, {Component, Fragment} from 'react';

import {Carousel, Icon, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import CardLoader from "../components/CardLoader/CardLoader";
import MapBackground from "../components/Backgrounds/MapBackground";

export default class Admin extends Component {

  state = {
    camera : undefined,
    data: ['1', '2', '3'],
    imgHeight: '100%',
    slideIndex: 0,
  }

  componentDidMount() {


  }

  componentDidUpdate() {
    if (this.state.slideIndex !== this.state.data.length - 1) {
      this.setState({slideIndex: this.state.data.length - 1});
    }
  }

  setMap(index) {
      this.setState({camera : index});
  }

  render() {

    return (
      <div className='top'>
        {/*<Button
          onClick={() => {
            this.setState({
              data: this.state.data.concat('AiyWuByWklrrUDlFignR'),
            });
          }}
        >Click me to add card</Button>*/}

        <MapBackground camera={this.state.camera}>
          <Carousel
            autoplay={false}
            selectedIndex={this.state.slideIndex}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={this.setMap.bind(this)}
          >

              <CardLoader index={0} card={'PictureCard'}/>

              <CardLoader index={56} card={'TextCard'}/>


              <CardLoader index={57} card={'TextCard'}/>

              <CardLoader index={1} card={'PictureCard'}/>

          </Carousel>

        </MapBackground>
      </div>
    );

  }
}
