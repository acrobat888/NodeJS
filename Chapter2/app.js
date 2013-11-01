//
// Nockmarket
//
/// <reference path="../NodeJS/defines/node.d.ts" />
'use strict';
var exchangeData = {}, exch = require('./lib/exchange'), nocklib = require('./lib/nocklib'), timeFloor = 500, timeRange = 1000;

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

    var pause = Math.floor(Math.random() * timeRange) + timeFloor;

    setTimeout(submitRandomOrder, pause);
    console.log(exch.getDisplay(exchangeData));
}

submitRandomOrder();
//# sourceMappingURL=app.js.map
