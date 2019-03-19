import {TokenAnalyst} from '@tokenanalyst/sdk';
import React, { Component } from 'react';
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
    return (
      <div className="App">
      Please wait a couple of seconds ...
      <table id="transaction-table">
      <tbody>
        <tr><td>Transaction hash</td><td>From</td><td>To</td></tr>
        {this.state.entries.map(entry => {
          return(<tr>
              <td>{entry.TXHASH}</td>
              <td>{entry.FROMADDR}</td>
              <td>{entry.TOADDR}</td>
            </tr>)
        })
        }
        </tbody>
      </table>
    </div>
    );
  }
}

export default App;
