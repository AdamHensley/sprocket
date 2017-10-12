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
            cash: 0,
            sprockets: 0,
            action: "Select Action",
            count: 0,
            currentPrice: 0,
            amount: 0,
            total: 0
        };

        setInterval(function() {
            var self = this;
            Client.checkPrice(function(data) {
                self.setState({currentPrice : data.currentPrice});
            });
        }.bind(this), 3000);
    }

    handleSubmit = () => {

        var self = this;
        try{
            if (this.state.action === "Buy") {
                Client.buy({sprockets: this.state.amount, unit_price: this.state.currentPrice},
                    response => self.setState({
                        history: response.history,
                        cash: response.cash,
                        sprockets: response.sprockets
                    }));
            } else {
                Client.sell({sprockets: this.state.amount, unit_price: this.state.currentPrice},
                    response => self.setState({
                        history: response.history,
                        cash: response.cash,
                        sprockets: response.sprockets
                    }));
            }
        } finally {
            this.props.sendData(this.state.history, this.state.cash, this.state.amount);
        }






    };

    setAction (eventKey, event) {
        var actionEvent = "";
        if(eventKey === "1") {
            actionEvent = "Buy";
        } else {
            actionEvent = "Sell";
        }

        this.setState({
            action: actionEvent
        });
    }

    setAmount(event) {
        this.setState({
            amount: event.target.value
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-5"/>
                    <div className="col-xs-2">Current Price: ${this.state.currentPrice}</div>
                    <div className="col-xs-5"/>
                </div>

                <div className="row" style={{padding:10}}>
                    <div className="col-xs-4"/>
                    <div className="col-xs-2">Action</div>
                    <div className="col-xs-2">
                        <DropdownButton title={this.state.action} id="dropdown-size-medium" onSelect={this.setAction.bind(this)} value={this.state.action}>
                            <MenuItem eventKey="1" value="Buy">Buy</MenuItem>
                            <MenuItem eventKey="2" value="Sell">Sell</MenuItem>
                        </DropdownButton>
                    </div>
                    <div className="col-xs-4"/>
                </div>

                <div className="row">
                    <div className="col-xs-4"/>
                    <div className="col-xs-2">Amount</div>
                    <div className="col-xs-2">
                        <input type="number" value={this.state.amount} onChange={this.setAmount.bind(this)}  placeholder="0" />
                    </div>
                    <div className="col-xs-2"/>
                </div>
                <div className="row" style={{padding:10}}>
                    <div className="col-xs-4"/>
                    <div className="col-xs-2">Total</div>
                    <div className="col-xs-2">{this.sum(this.state.amount)}</div>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>

            </div>
        );
    }

    sum(count) {
        return (this.state.currentPrice * count).toFixed(2);
    }
}


export default SubmitOrder;

