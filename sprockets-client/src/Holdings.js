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
                <span>Available Cash: ${this.props.cash} Sprockets: {this.props.availableSprockets}</span>
            </div>
        );
    }

}

export default Holdings;
