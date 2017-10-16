/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";
import Client from "./Client";
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class SubmitOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            cash: 100,
            sprockets: 0,
            availableSprockets: 0,
            action: "Select Action",
            count: 0,
            currentPrice: 0,
            amount: 0,
            total: 0,
            selected_price: null,
            time: ""
        };

        setInterval(function() {
            var self = this;
            Client.checkPrice(function(data) {
                self.setState({
                    currentPrice : data.currentPrice,
                    time: data.time
                                });
            });
        }.bind(this), 3000);
    }

    handleSubmit = () => {


        var self = this;

        try {
                if (self.state.action === "Buy") {
                    Client.buy({sprockets: self.state.amount, unit_price: self.state.selected_price},
                        function (response) {
                            self.setState({
                                history: response.history,
                                cash: response.cash,
                                availableSprockets: response.sprockets,
                                selected_price: null
                            });
                            self.props.sendData(self.state.history, self.state.cash, self.state.availableSprockets)
                        });
                } else {
                    Client.sell({sprockets: self.state.amount, unit_price: self.state.selected_price},
                        function (response) {
                            self.setState({
                                history: response.history,
                                cash: response.cash,
                                availableSprockets: response.sprockets,
                                selected_price: null
                            });
                            self.props.sendData(self.state.history, self.state.cash, self.state.availableSprockets);
                        });
                    }
        } finally {

        }
    };

    setAction (eventKey, event) {
        var actionEvent = "";
        if(eventKey === "1") {
            actionEvent = "Buy";
        } else {
            actionEvent = "Sell";
        }

        if(this.state.selected_price === null)
            this.setState({selected_price: this.state.currentPrice});

        this.setState({
            action: actionEvent
        });
    }

    setAmount(event) {
        this.setState({
            amount: event.target.value
        });
        this.handleInputChange();
    }

    handleInputChange() {
        if(this.state.selected_price === null)
            this.setState({selected_price: this.state.currentPrice});
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-xs-3" style={{textAlign:'left'}}>Current Price: ${this.state.currentPrice} <em>(as of {this.state.time})</em></div>
                    <div className="col-xs-5"/>
                </div>
                {/*<div className="row">*/}
                    {/*<div className="col-xs-5"/>*/}
                    {/*<div className="col-xs-2">Captured Price: ${this.state.selected_price || "No price captured."}</div>*/}
                    {/*<div className="col-xs-5"/>*/}
                {/*</div>*/}

                <div style={{backgroundColor:'#e5e5e5', borderStyle:'solid', maxWidth:'300px' }}>
                    <form >
                        <div className="row" style={{padding:10}}>

                            <div className="col-xs-2">Action</div>
                            <div className="col-xs-2">
                                <DropdownButton title={this.state.action} id="dropdown-size-medium" onSelect={this.setAction.bind(this)} onChange={this.handleInputChange} value={this.state.action}>
                                    <MenuItem eventKey="1" value="Buy">Buy</MenuItem>
                                    <MenuItem eventKey="2" value="Sell">Sell</MenuItem>
                                </DropdownButton>
                            </div>
                            <div className="col-xs-4"/>
                        </div>

                        <div className="row">

                            <div className="col-xs-2">Amount</div>
                            <div className="col-xs-2">
                                <input type="number" min="0" value={this.state.amount} onChange={this.setAmount.bind(this)}  placeholder="0" />
                            </div>
                            <div className="col-xs-2"/>
                        </div>
                        <div className="row" style={{padding:10}}>

                            <div className="col-xs-2">Total</div>
                            <div className="col-xs-2">${this.sum(this.state.amount)}</div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>

                    </form>
                </div>
            </div>
        );
    }

    sum(count) {
        return (this.state.selected_price * count).toFixed(2);
    }
}


export default SubmitOrder;

