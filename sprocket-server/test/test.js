var assert = require('assert');
var request = require('supertest');
var chai = require('chai');

describe('GET /', function () {
    it('should respond with "ok"', function (done) {
        request(require('../app.js'))
            .get('/')
            .expect(200, function (err, res) {
                assert(res.body,{status:'ok'});
                done();
            });
    });
});

describe('GET /currentPrice', function () {
    it('should respond with a number', function (done) {
        request(require('../app.js'))
            .get('/currentPrice')
            .expect(200, function (err, res) {
                assert(res.body.currentPrice, /\d+/);
                done();
            });
    });
});

describe('PUT /buy with no body', function () {
    it('should respond with an error message', function (done) {
        request(require('../app.js'))
            .put('/buy')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert(res.body.error, "Missing Data from request!");
                done();
            });
    });
});

describe('PUT /buy with good data', function () {
    it('should respond with successful response', function (done) {
        request(require('../app.js'))
            .put('/buy')
            .set('Accept', 'application/json')
            .send({'sprockets':1, 'unit_price':25})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert(res.body.cash, 75);
                assert(res.body.sprockets, 1);
                assert(res.body.history.length, 1);
                done();
            });
    });
});

describe('PUT /buy without enough money', function () {
    it('should respond with an error message', function (done) {
        request(require('../app.js'))
            .put('/buy')
            .set('Accept', 'application/json')
            .send({'sprockets':5, 'unit_price':50})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert("You do not have enough money!!", res.body.error);
                done();
            });
    });
});

describe('PUT /sell with no data', function () {
    it('should respond with an error message', function (done) {
        request(require('../app.js'))
            .put('/sell')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert(res.body.error, "Missing Data from request!");
                done();
            });
    });
});

describe('PUT /sell with good data', function () {
    it('should respond with successful response', function (done) {
        request(require('../app.js'))
            .put('/sell')
            .set('Accept', 'application/json')
            .send({'sprockets':1, 'unit_price':25})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert(res.body.cash, 100);
                assert.deepStrictEqual(0, res.body.sprockets);
                assert(2, res.body.history.length);
                done();
            });
    });
});

describe('PUT /sell too many sprockets', function () {
    it('should respond with an error message', function (done) {
        request(require('../app.js'))
            .put('/sell')
            .set('Accept', 'application/json')
            .send({'sprockets':5, 'unit_price':25})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function (err, res) {
                assert(res.body.error, "You do not have enough sprockets!!");
                done();
            });
    });
});