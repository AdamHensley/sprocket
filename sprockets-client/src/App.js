import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Holdings from "./Holdings";
import History from "./History";
import SubmitOrder from "./SubmitOrder";

class App extends Component {
    constructor() {
        super();
        this.state = {
            availableCash: 100,
            availableSprockets: 0,
            sprockets: 0,
            currentPrice: 22,
            history: [],
            action: "",
            amount: 0,
            cash: 100,
        };
    }

    addData = (history, cash, availableSprockets) => {
        this.setState({
            history: history,
            cash: cash,
            availableSprockets: availableSprockets
        });
    };

  render() {
    const { sprockets, history, action, amount, cash, currentPrice, availableSprockets} = this.state;

    return (
      <div className="App">
        <div className="col-xs-4"/>
          <div className="col-xs-4" style={{textAlign:'left'}}>
              <h1>Sprocket Exchange</h1>
              <h2>Your Holdings</h2>
              <Holdings cash={cash} availableSprockets={availableSprockets}/>
              <h2>Place Order</h2>
              <SubmitOrder sendData={this.addData.bind(this)} action={action} amount={amount} history={history} cash={cash} sprockets={sprockets} currentPrice={currentPrice}/>
              <h2>History</h2>
              <History history={history}/>
          </div>
          <div className="col-xs-4"/>
      </div>
    );
  }
}

export default App;
