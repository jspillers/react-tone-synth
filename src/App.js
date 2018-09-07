import React, { Component } from 'react';
import Synth from "./components/Synth"
import StepSequencer from "./components/StepSequencer"
import { Button, Modal } from "react-bootstrap"
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleWhatsThisClose = this.handleWhatsThisClose.bind(this)
    this.handleWhatsThisOpen = this.handleWhatsThisOpen.bind(this)
    this.state = { showWhatsThisModal: false };
  }

  handleWhatsThisOpen() {
    this.setState({ showWhatsThisModal: true })
  }

  handleWhatsThisClose() {
    this.setState({ showWhatsThisModal: false })
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12 main">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">
                React Tone Synth
                <Button
                  bsSize="xsmall"
                  onClick={this.handleWhatsThisOpen}
                >What is this?</Button>
              </h1>
            </header>
            <div className="tone-synth">
              <Synth />
              <StepSequencer />
            </div>
          </div>
        </div>
        <div className="static-modal">
          <Modal show={this.state.showWhatsThisModal}>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>One fine body...</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleWhatsThisClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App
