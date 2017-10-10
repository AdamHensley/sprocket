/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";

export default function Holdings(props) {
    const { availableCash, sprockets } = props;

    return (
        <div>
            <span>Available Cash: {availableCash} Sprockets: {sprockets}</span>
        </div>
    );
}