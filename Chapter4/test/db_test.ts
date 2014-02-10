/// <reference path="../../NodeJS/defines/node.d.ts" />

'use strict';

var assert = require('assert'),
    db = require('../lib/db'),
    nocklib = require('../lib/nocklib'),
    should = require('should');

var exchangeData = {};

suite('database', function () {
    var insertOrder;

    test('open should open database connection', function (done) {
        db.open(done);
    });

    test('insertOne should insert a transaction', function (done) {
        // generate a random order
        var order = nocklib.generateRandomOrder(exchangeData);

        db.insertOne('transactions', order, function (error, outOrder) {
            // verify no error
            should.not.exist(error);

            // verify the order exists
            should.exist(outOrder._id);

            insertOrder = outOrder;
            done();
        });
    });

    test('findOne should find a single transaction', function (done) {
        // id of transaction
        var id = insertOrder._id;

        db.findOne('transactions', id, function (error, outOrder) {
            // verify no error
            should.not.exist(error);

            // verify order exists
            should.exist(outOrder._id);

            outOrder.price.should.eql(insertOrder.price);
            outOrder.volume.should.eql(insertOrder.volume);

            done();
        });
    });
});

