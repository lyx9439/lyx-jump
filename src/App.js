import React, { Component } from 'react';
import './App.css'
import Actor from './components/Actor'
import Block from './components/Block'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Actor></Actor>
        <div className="blocks">
        <Block></Block>
        </div>
      </div>
    );
  }
}

export default App;
