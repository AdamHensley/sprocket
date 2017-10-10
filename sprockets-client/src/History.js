/**
 * Created by Adam Hensley on 10/10/2017.
 */
import React from "react";

export  default function History(props) {
    const { history } = props;

    const historyRows = history.map((history, idx) => (
        <tr key={idx} >
            <td className="right aligned">{history.date}</td>
            <td className="right aligned">{history.action}</td>
            <td className="right aligned">{history.unit_price}</td>
            <td className="right aligned">{history.count}</td>
            <td className="right aligned">{total(history.unit_price, history.count)}</td>
        </tr>
    ));

    return (
        <div className="col-s-6 col-sm-offset-5">
            <table style={{ maxWidth: 500 }} className="ui selectable structured large table">
                <thead>
                <tr>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Unit Price</th>
                    <th>Count</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {historyRows}
                </tbody>
            </table>
        </div>
    );
}
function total(unit_price, count) {
    return (unit_price * count).toFixed(2);
}
