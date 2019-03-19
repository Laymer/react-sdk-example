import {TokenAnalyst} from '@tokenanalyst/sdk';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.t = new TokenAnalyst();
    this.state = {entries: []}
    const ref = this
    this.t.streams.transactionsWithLabelsAndPrice.subscribe(data => {
      const oldEntries = ref.state.entries
      ref.setState({entries: [data].concat(oldEntries)})
    });
  }

  render() {
    console.log(this.state.entries)
    return (
      <div className="App">
        <ul>
          {this.state.entries.map(entry => {
            return(<li>
              <div>{entry.BLOCKHASH}</div>
              <div>{entry.TXHASH}</div>
            </li>);
          })}
        </ul>
      </div>
    );
  }
}

export default App;
