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
        lat: 48.905031,
        lng: 2.347298,
      },
      {
        lat: 48.891281,
        lng: 2.322611,
        title: 'Maison 4 pièces, 130m²',
        price: '770 000 €',
        infos: 'Celle-ci comprend , au rez de chaussée : une pièce de vie avec une cuisine américaine, à l\'étage vous trouverez, une salle de bain et wc séparé, ainsi qu\'un dressing ou bureau. Le sous sol peut accueillir une buanderie. Un vaste garage / atelier complète ce lot.',
        images: './imageA.jpeg'
      },
      {
        lat: 48.857915,
        lng: 2.274713,
        title: 'Maison 5 pièces, 143m²',
        price: '810 000 €',
        infos: 'Cette maison de ville sur 4 niveaux vous propose : Au rez de chaussée un plateau de 47M2 environ comprenant une pièce de vie, une buanderie, une salle d\'eau ainsi qu\'un WC séparé. Au premier étage un plateau de 39M2 environ comprenant une pièce de vie ainsi qu\'une cuisine ouverte Au deuxième étage un plateau de 39 M2 environ composé de 2 chambres, une salle d\'eau, une salle de bains et au dernier étage un espace mansardé de 10M2 environ carrez et de 30M2 environ au sol.Idéalement situé au coeur du quartier résidentiel et à proximité des transports, des écoles ainsi que des commerces.',
        images: './imageB.jpg'
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
        defaultZoom={13}
        hoverDistance={K_SIZE / 2}
      >
        <MyGreatPlaceWithHover onClick={() => this.setState({choice: 1}, () => console.log('cool'))} lat={48.905706} lng={2.333243} text={'A'} />
        <MyGreatPlaceWithHover onClick={() => this.setState({choice: 2})} lat={48.903471} lng={2.348724} text={'B'} />
      </GoogleMapReact>
    );
  };

  Infos = () => {
    <div className={infos}>
      <div class="card-poster">
        <h2 class="card-poster__title">{this.logements[this.state.choice].title}</h2>
      </div>
      <div class="card-text">
        <div class="card-meta">
          <span class="card-meta__genre">{this.logements[this.state.choice].price}</span>
        </div>
        <p class="card-text__paragraph">{this.logements[this.state.choice].infos}</p>
      </div>
    </div>
  }

  render() {

    console.log('this.state', this.state);
    return (
      <div onClick={this._onClick} style={styles.container}>
        {this.state.map && <this.MappleGoog />}
        {this.state.choice > 0 && <this.Infos />}
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
    height: window.innerHeight
  },
};
