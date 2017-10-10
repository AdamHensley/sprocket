var express = require('express');
var router = express.Router();

var currencyTimer;
var user = {
    cash: 100,
    sprockets: 0,
    history: []
};

var sprocket = {
    currentPrice: 22
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/currentPrice', function(req, res, next) {

    if(!currencyTimer) {
        currencyTimer = setCurrentPrice();
    }
    res.setHeader('Content-Type', 'application/json');
    var body = { currentPrice: sprocket.currentPrice };
    res.body = body;
    res.send(JSON.stringify(body));
});


router.put('/buy',function (req, res) {
    var data = req.body;
    res.setHeader('Content-Type', 'application/json');

    if(!req.body.sprockets || !req.body.unit_price) {
        res.send({error: "Missing Data from request!"});

    } else if((data.unit_price * data.sprockets) > user.cash) {
        res.send({error: "You do not have enough money!!"});

    } else {
        (function (x) {
            user.sprockets += Number(x);
        }(data.sprockets));

        user.cash -= (data.unit_price * data.sprockets);

        var historyItem = {
            date: new Date(),
            unit_price: data.unit_price,
            sprockets: data.sprockets,
            action: "Buy"
        };

        user.history.push(historyItem);
        var body = user;
        res.send(JSON.stringify(body));
    }
});

router.put('/sell',function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    var data = req.body;

    if(!req.body.sprockets || !req.body.unit_price) {
        res.send({error: "Missing Data from request!"});

    } else if(user.sprockets < data.sprockets) {

        res.send({error: "You do not have enough sprockets!!"});

    } else {

        (function (x) {
            user.sprockets -= Number(x);
        }(data.sprockets));

        user.cash += (Number(data.unit_price) * Number(data.sprockets));

        var historyItem = {
            date: new Date(),
            unit_price: data.unit_price,
            sprockets: data.sprockets,
            action: "Sell"
        };

        user.history.push(historyItem);
        res.send(JSON.stringify(user));
    }
});


var setCurrentPrice = function () {
    setTimeout(function () {
        var price = Math.floor(Math.random() * 50) + 12;
        sprocket.currentPrice = price;
    }, 2000);
};

module.exports = router;
