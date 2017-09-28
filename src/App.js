import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import StoreForm from './StoreForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Redux Form Error</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <StoreForm />
      </div>
    );
  }
}

export default App;
