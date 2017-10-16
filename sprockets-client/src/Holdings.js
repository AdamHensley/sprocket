/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";

class Holdings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Available Cash: ${this.props.cash}</p>
                <p> Sprockets: {this.props.availableSprockets}</p>
            </div>
        );
    }

}

export default Holdings;
