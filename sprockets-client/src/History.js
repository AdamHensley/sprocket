/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";

export  default function History(props) {
    const { history } = props;

    const historyRows = history.map((hist, idx) => (
        <tr key={idx} >
            <td className="right aligned">{hist.date}</td>
            <td className="right aligned">{hist.action}</td>
            <td className="right aligned">{hist.unit_price}</td>
            <td className="right aligned">{hist.sprockets}</td>
            <td className="right aligned">{total(hist.unit_price, hist.sprockets)}</td>
        </tr>
    ));

    return (
        <div>
            <table style={{ maxWidth: 500 }} className="ui selectable structured large table">
                <thead>
                <tr>
                </tr>
                <tr style={{backgroundColor:'#bcbcbc'}}>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Unit Price</th>
                    <th>Count</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody style={{backgroundColor:'#e5e5e5'}}>
                {historyRows}
                </tbody>
            </table>
        </div>
    );
}
function total(unit_price, count) {
    return (unit_price * count).toFixed(2);
}
