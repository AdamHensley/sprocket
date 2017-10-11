import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Holdings from "./Holdings";
import History from "./History";
import SubmitOrder from "./SubmitOrder";
import Client from "./Client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            availableCash: 100,
            sprockets: 0,
            currentPrice: 0,
            history: [],
            action: "",
            amount: 0,
            cash: 0,
        };
    }

    addData = (history, cash, sprockets) => {
        this.setState({
            history: history,
            cash: cash,
            sprockets: sprockets
        });
    };

  render() {
    const { sprockets, history, action, amount, cash, currentPrice} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <h2> Holdings </h2>
          <Holdings cash={cash} sprockets={sprockets}/>
          <h2> Place Order </h2>
          <SubmitOrder sendData={this.addData.bind(this)} action={action} amount={amount} history={history} cash={cash} sprockets={sprockets} currentPrice={currentPrice}/>
          <h2> History </h2>
          <History history={history}/>
      </div>
    );
  }
}

export default App;
