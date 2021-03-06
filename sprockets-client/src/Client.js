/**
 * Created by Adam Hensley on 10/10/2017.
 */
function buy(data, cb) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch('http://localhost:3001/buy', {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
        accept: 'application/json',
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function sell(data, cb) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch('http://localhost:3001/sell', {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
        accept: 'application/json',

    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkPrice(cb) {
    return fetch('http://localhost:3001/currentPrice', {
        method: 'GET',
        accept: 'application/json',
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { buy, sell, checkPrice };
export default Client;