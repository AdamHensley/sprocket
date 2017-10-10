import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Holdings from "./Holdings";
import History from "./History";
import SubmitOrder from "./SubmitOrder";
import Client from "./Client";

class App extends Component {
    state = {
        availableCash: 100,
        sprockets: 0,
        currentPrice: 27.50,
        history: [{
            date: "3/13",
            action: "Buy",
            unit_price: 27.33,
            count: 5,
        }],
        action: "",
        amount: 0,
        cash: 0,
    };


  render() {
    const { availableCash, sprockets, history, action, amount, cash, currentPrice} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <h2> Holdings </h2>
          <Holdings availableCash={availableCash} sprockets={sprockets}/>
          <h2> Place Order </h2>
          <SubmitOrder action={action} amount={amount} history={history} cash={cash} sprockets={sprockets} currentPrice={currentPrice}/>
          <h2> History </h2>
          <History history={history}/>
      </div>
    );
  }
}

function init() {
    setTimeout(function() {
        var data = Client.checkPrice(function(data) {
            App.currentPrice = data.currentPrice;
        });
    }, 3000);
}

init();

export default App;
