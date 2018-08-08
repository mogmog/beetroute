import React, {Component} from 'react';
import Swipeable from 'react-swipeable'


import InstagramEmbed from 'react-instagram-embed'
import {Card, WingBlank, WhiteSpace, Modal, Carousel, Button} from 'antd-mobile';
import Picture from "./Picture";

class PictureCard extends Component {
  constructor(props) {
    super(props);

    this.state = {modal: false, currentThing : 0, slideIndex : 0};

  }

  render() {

    const {data, onClick, extra, clickevents, index, open, onSwipeDown, onVerticalChange} = this.props;

    const {modal, currentThing} = this.state;

    const ig_json = {
      "version": "1.0",
      "title": "",
      "author_name": "_.instagraham._",
      "author_url": "https://www.instagram.com/_.instagraham._",
      "author_id": 174821038,
      "media_id": "1822796584040034115_174821038",
      "provider_name": "Instagram",
      "provider_url": "https://www.instagram.com",
      "type": "rich",
      "width": 658,
      "height": null,
      "html": "\u003cblockquote class=\"instagram-media\" data-instgrm-permalink=\"https://www.instagram.com/p/BlL39XpgG9D/?utm_source=ig_embed\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"\u003e\u003cdiv style=\"padding:8px;\"\u003e \u003cdiv style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;\"\u003e \u003cdiv style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cp style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\"\u003e\u003ca href=\"https://www.instagram.com/p/BlL39XpgG9D/?utm_source=ig_embed\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;\" target=\"_blank\"\u003eA post shared by Graham B (@_.instagraham._)\u003c/a\u003e on \u003ctime style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2018-07-13T20:38:27+00:00\"\u003eJul 13, 2018 at 1:38pm PDT\u003c/time\u003e\u003c/p\u003e\u003c/div\u003e\u003c/blockquote\u003e\n\u003cscript async defer src=\"//www.instagram.com/embed.js\"\u003e\u003c/script\u003e",
      "thumbnail_url": "https://scontent-lht6-1.cdninstagram.com/vp/0ccd6254178cb6534853b8a3544d1f5c/5C054717/t51.2885-15/sh0.08/e35/s640x640/36701771_223985118231504_6101762112172851200_n.jpg",
      "thumbnail_width": 640,
      "thumbnail_height": 640
    }

    return (

      <div>
        <Card>

          <Card.Body>

            <Swipeable


              onSwipedDown={(e, abs) => {
                //hack
                if ((this.state.slideIndex === 0 || this.state.slideIndex === 1) && abs < 0) onVerticalChange(e, abs);
              }}

            >

            <Carousel className="my-carousel"
                      vertical
                      selectedIndex={0}
                      dragging={open}
                      swiping={open}
                      beforeChange={(from, to) => {
                        this.setState({slideIndex: (to || 0)})
                      }}

            >
              {
                ['BlD9Iq6gI62', 'Bj7Y5VagLll', 'Bk8FXQaAJFu', 'Bf_IlUXjCep'].map((type, i) => (
                    <div><Picture id={type} thekey={i}/></div>
                )
                )
              }

            </Carousel>
            </Swipeable>
          </Card.Body>
        </Card>

      </div>);
  }
}

PictureCard.defaultProps = {
  data: {},
}

export default PictureCard;
