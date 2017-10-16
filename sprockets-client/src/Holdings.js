/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";

class Holdings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cash: 100,
            sprockets: 0
        };

    }

    render() {
        const { cash, availableSprockets } = this.state;

        return (
            <div>
                <span>Available Cash: ${this.props.cash} Sprockets: {this.props.availableSprockets}</span>
            </div>
        );
    }

}
// Holdings.propTypes = {
//     cash: React.PropTypes.,
//     sprockets: React.PropTypes.any,
// };


export default Holdings;
