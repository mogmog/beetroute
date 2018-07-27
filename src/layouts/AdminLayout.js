import React, {Component, Fragment} from 'react';
import * as MapboxGl from 'mapbox-gl';

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";


import {
  Row,
  Col,
} from 'antd';

import borders from '../assets/allcountries';
import heatmap_bad from '../assets/heatmap_bad.geojson';
import heatmap_good from '../assets/heatmap_good.geojson';

import HeadlineCreator from "../components/Admin/HeadlineCreator";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

export default class Admin extends Component {

  flyTo(whereTo) {
    if (this.map) this.map.flyTo(whereTo);
  }

  addBorder(data, colours) {

    // this.map.addSource('borders', {
    //   type: 'geojson',
    //   data: borders,
    // });

    try {


      this.map.removeLayer('trees-heat');
      this.map.removeLayer('trees-point');

      this.map.removeSource('trees');


    } catch(e) {

    }

    this.map.addSource('trees', {
      type: 'geojson',
      data: (data === 'heatmap_bad' ? heatmap_bad : heatmap_good)
    });

    this.map.addLayer({
      id: 'trees-heat',
      type: 'heatmap',
      source: 'trees',
      maxzoom: 15,
      paint: {
        // increase weight as diameter breast height increases
        'heatmap-weight': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [1, 0],
            [62, 1]
          ]
        },
        // increase intensity as zoom level increases
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [15, 3]
          ]
        },
        // assign color values be applied to points depending on their density
        'heatmap-color': colours,
        // increase radius as zoom increases
        'heatmap-radius': {
          stops: [
            [11, 15],
            [15, 20]
          ]
        },
        // decrease opacity to transition into the circle layer
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [15, 0]
          ]
        },
      }
    }, 'waterway-label');


    this.map.addLayer({
      id: 'trees-point',
      type: 'circle',
      source: 'trees',
      minzoom: 14,
      paint: {
        // increase the radius of the circle as the zoom level and dbh value increases
        'circle-radius': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [{ zoom: 15, value: 1 }, 5],
            [{ zoom: 15, value: 62 }, 10],
            [{ zoom: 22, value: 1 }, 20],
            [{ zoom: 22, value: 62 }, 50],
          ]
        },
        'circle-color': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
          ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 1]
          ]
        }
      }
    }, 'waterway-label');

    const that = this;

    that.map.on('click', 'trees-point', function(e) {
      new MapboxGl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML('<b>SOMETHING:</b> ' + e.features[0].properties.dbh)
        .addTo(that.map);
    });

  }

  render() {

    const that = this;

    return (
      <div>

        <Row>
          <Col span={14}>

            <h1>ARTICLE CREATOR</h1>

            <HeadlineCreator flyTo={this.flyTo.bind(this)} addBorder={this.addBorder.bind(this)}></HeadlineCreator>
          </Col>

          <Col span={10}>

            <Map
              style="mapbox://styles/mapbox/dark-v9"
              containerStyle={{
                height: "100vh",
                width: "100%",
                position: 'absolute',
              }}
              center={[ 44.361488, 33.312805 ]}
              onStyleLoad={(map) => {

                that.map = map;
              }}
            >

            </Map>

          </Col>

        </Row>
      </div>
    );
  }
}
