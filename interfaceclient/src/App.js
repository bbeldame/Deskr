import React, { Component } from 'react';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';
import GoogleMapReact from "google-map-react";
import SocketIOClient from 'socket.io-client';
import MyGreatPlaceWithHover from './my_great_place_with_hover.jsx';
import {K_SIZE} from './my_great_place_with_hover_styles.js';

export default class App extends Component {
  constructor(props) {
    super(props);
  
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://localhost:3001');
    this.socket.on('displayMap', this.displayMap);

    this.GoogleMapConfig = {
      key: 'AIzaSyCiJKPshPbA-dOYAyHcM9iwcfSKelGULUE',
      language: 'fr',
    };

    this.logements = [
      {
        lat: 48.851557,
        lng: 2.357421,
      },
      {
        lat: 48.891281,
        lng: 2.322611,
      },
      {
        lat: 48.857915,
        lng: 2.274713,
      },
    ];

    this.state = {
      map: true,
      choice: 0,
    };
  }

  displayMap = () => {
    this.setState({map: true});
  }

  MappleGoog = () => {
    console.log('mourir');
    return (
      <GoogleMapReact
        bootstrapURLKeys={this.GoogleMapConfig}
        defaultCenter={
          {
            lat: this.logements[this.state.choice].lat,
            lng: this.logements[this.state.choice].lng,
          }
        }
        defaultZoom={this.state.choice > 0 ? 13 : 9}
        hoverDistance={K_SIZE / 2}
      >
        <MyGreatPlaceWithHover lat={48.891281} lng={2.322611} text={'1'} />
        <MyGreatPlaceWithHover lat={48.857915} lng={2.274713} text={'2'} />
      </GoogleMapReact>
    );
  };

  render() {
    return (
      <div onClick={this._onClick} style={styles.container}>
        {this.state.map && <this.MappleGoog />}
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '400px'
  },
};
