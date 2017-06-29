import React, { Component } from 'react';
import './App.css';
import repeat from './repeat.json';
import SocketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.client = new window.ApiAi.ApiAiClient({
      accessToken: 'c99bb3d704fc4d289693611ca226784c',
      streamClientClass: window.ApiAi.ApiAiStreamClient,
      sessionId: 42,
    });

    this.socket = SocketIOClient('http://localhost:3001');

    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.lang = ['fr-FR'];
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.onresult = this.onResultFromSTT;

    this.state = {
      talking: false,
      listening: false,
      lastResponse: '',
    };
  }

  repeat = () => {
    this.speak(`${repeat[Math.floor(Math.random()*repeat.length)]} ${
      this.state.lastResponse || 'rien du tout'}`, { save : false });
  }

  speak = (sentence, { save } = { save: true }) => {
    window.responsiveVoice.speak(
      sentence,
      "French Female",
      {
        onstart: () => this.setState({talking: true, lastResponse: save ? sentence : this.state.lastResponse}),
        onend: () => this.setState({talking: false, listening: false})
      }
    );
  }

  activateVoice = () => {
    this.recognition.stop();
    this.recognition.start();
    this.setState({
      listening: true,
    });
  }

  sendToBot = (sentence) => {
    console.log('sentence', sentence);
    const request = this.client.textRequest(sentence, { sessionId: 42 });

    request.then(response => {
      console.log('response api ai', response);
      if (response.result) {
        if (response.result.metadata &&
          response.result.metadata.intentName &&
            response.result.metadata.intentName.substring(0, 3) === 'JS/') {
              console.log('response.result.metadata.intentName.substring(3)', response.result.metadata.intentName.substring(3));
              if (response.result.metadata.intentName.substring(3) === 'Repeat') {
                this.repeat();
              } else if (response.result.metadata.intentName.substring(3) === 'Map') {
                this.socket.emit('displayMap');
                this.setState({talking: false, listening: false});
              } else if (response.result.metadata.intentName.substring(3) === 'DisplayHouse') {
                console.log('je suis ici');
                this.socket.emit('openImage');
                this.setState({talking: false, listening: false});
              }
        } else {
          this.speak(response.result.fulfillment.speech)
        }
      }
    });
  }

  onResultFromSTT = ({ results }) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      if (results && results[0]) {
        this.recognition.abort();
        this.sendToBot(results[0][0].transcript);
      }
    }, 500);
    if (results && results.length === 1) {
      const result = results[0];

      if (result.isFinal) {
        this.recognition.abort();
        this.sendToBot(result[0].transcript);
      }
    }
  }

  render() {
    return (
      <div className="App" style={{ height: window.innerHeight }}>
        {!this.state.listening && <button onClick={this.activateVoice} className="GiantButton"><img className="Logo" alt="logo" src="./logo.png" /></button>}
        {this.state.talking && <button className="GiantButton"><img className="Logo" alt="talking" src="./talking.gif" /></button>}
        {this.state.listening && !this.state.talking && <button className="GiantButton"><img className="Logo" alt="listening" src="./listening.gif" /></button>}
      </div>
    );
  }
}

export default App;
