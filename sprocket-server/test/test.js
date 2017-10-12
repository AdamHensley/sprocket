var assert = require('assert');
var routes = require('../routes/index');
var request = require('supertest');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
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
                //assert.type(res.body.currentPrice,primitive.number);
                done();
            });
    });
});