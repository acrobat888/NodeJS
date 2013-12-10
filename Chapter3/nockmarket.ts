//
// Nockmarket
//
/// <reference path="../NodeJS/defines/node.d.ts" />

'use strict';

var exchangeData = {},
    exch = require('./lib/exchange'),
    nocklib = require('./lib/nocklib'),
    db = require('./lib/db'),
    timeFloor = 500,
    timeRange = 1000;

function submitRandomOrder() {
    //
    // order
    //
    var order = nocklib.generateRandomOrder(exchangeData);
    console.log('order', order);

    if (order.type = exch.BUY)
        exchangeData = exch.buy(order.price, order.volume, exchangeData);
    else
        exchangeData = exch.sell(order.price, order.volume, exchangeData);

    db.insertOne('transactions', order, function (error, outOrder) {
        if (exchangeData.trades && exchangeData.trades.length > 0) {
            var trades = exchangeData.trades.map(function (trade) {
                trade.init = (order.type == exch.BUY) ? 'b' : 's';
                return trade;
            });

            // Now insert into the db
            db.insert('transactions', trades, function (error, trades) {
                pauseThenTrade();
            });
        }
        else
            pauseThenTrade();
    });

    function pauseThenTrade() {
        // Get the lenght of the pause
        var pause = Math.floor(Math.random() * timeRange) + timeFloor;

        setTimeout(submitRandomOrder, pause);

        console.log(exch.getDisplay(exchangeData));
    }


    var pause = Math.floor(Math.random() * timeRange) + timeFloor;

    setTimeout(submitRandomOrder, pause);
    console.log(exch.getDisplay(exchangeData));
}

db.open(function () {
    submitRandomOrder();
});
