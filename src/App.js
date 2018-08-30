import React, { Component } from 'react';
import Synth from "./components/Synth"
import StepSequencer from "./components/StepSequencer"
import { Button } from "react-bootstrap"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12 main">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">
                React Tone Synth <Button bsSize="xsmall">What is this?</Button>
              </h1>
            </header>
            <div className="tone-synth">
              <Synth />
              <StepSequencer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
