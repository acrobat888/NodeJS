//
// Exchange 
//
'use strict';

var $ = require('jquery'),
    binaryheap = require('./binaryheap');

var BUY = "buys",
    SELL = "sells";

function createBinaryHeap(orderType)
{

    return new binaryheap(function (x) {
        return x;
    }, orderType);
}

function createExchange(exchangeData)
{

    var cloned = $.extend(true, {}, exchangeData);

    cloned.trades = [];
    init(cloned, BUY);
    init(cloned, SELL);

    return cloned;


    function init(exchange, orderType)
    {
        if (!exchange[orderType])
        {
            exchange[orderType] = {};
            exchange[orderType].volumes = {};

            var options = {};
            if (BUY == orderType)
            {
                //
                // Trades occur at the highest prices so we use the maximum binary heap
                //
                options.max = true;
            }

            exchange[orderType].prices = createBinaryHeap(options);
        }
    }
} module.exports = {
    BUY: BUY,
    SELL: SELL,
    buy: function (price, volume, exchangeData) {
        return order(BUY, price, volume, exchangeData);
    },
    sell: function (price, volume, exchangeData) {
        return order(SELL, price, volume, exchangeData);
    },
    order: order
}
