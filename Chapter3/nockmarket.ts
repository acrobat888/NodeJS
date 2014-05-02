//
// Nockmarket
//
/// <reference path="../NodeJS/defines/node.d.ts" />

'use strict';

interface ExchangeDataType {
    trades?: Array;             // trades are optional and we need this to ensure typescript
                                // handles the .trades after getting sell/buy
};

var exchangeData: ExchangeDataType = {},
    express = require('express'),
    nocklib = require('./lib/nocklib'),
    exch = require('./lib/exchange'),
    db = require('./lib/db'),
    timeFloor = 500,
    timeRange = 1000;

function submitRandomOrder() {
    //
    // order
    //
    var order = nocklib.generateRandomOrder(exchangeData);
    console.log('order', order);

    if (order.type == exch.BUY)
        exchangeData = exch.buy(order.price, order.volume, exchangeData);
    else
        exchangeData = exch.sell(order.price, order.volume, exchangeData);

    db.insertOne('transactions', order, function (error, outOrder) {
        if (exchangeData.trades && exchangeData.trades.length > 0) {
            //
            // trade: any needed because of typescript
            //
            var trades = exchangeData.trades.map(function (trade: any) {        
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

        setTimeout(null/*submitRandomOrder*/, pause);

        console.log(exch.getDisplay(exchangeData));
    }


    var pause = Math.floor(Math.random() * timeRange) + timeFloor;

    setTimeout(submitRandomOrder, pause);
    console.log(exch.getDisplay(exchangeData));
}

var app = express.createServer();

app.configure(function () {
    console.log("app.configure");
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));
});

app.set('view options', {
    layout: false
});

app.get('/', function (request, result) {
    // result.send('Hello World');

    // 
    // https://gist.github.com/3949958  -- move to /views/charts.ejs
    // To render the results, undo this line and pull in
    //
    result.render('chart');

});

app.get('/chart', function (request, result) {
    // Only one result per json call
    result.render('chart');
});


app.get('/api/trades', function (request, result) {
    db.find('transactions',
        { init: { $exists: true } },
        100,
        function (error, trades) {
            if (error) {
                console.error(error);
                return;
            }

            var json = [];

            // Typescript requires 'any' type here and next to date to compile.  
            // Need to figure out what type has to be to make this work
            //
            var lastTime:any = 0;
            // 
            // Highstock expects an array of arrays.  Each 
            // subarray of form [time, price]
            //
            trades.reverse().forEach(function (trade) {
                var date:any = new Date(parseInt(trade._id
                    .toString()
                    .substring(0, 8), 16) * 1000);
                var dataPoint = [date.getTime(), trade.price];

                if (date - lastTime > 1000)
                    json.push(dataPoint);

                lastTime = date;
            });

            result.json(json);
        });
});

db.open(function () {
    submitRandomOrder();
    app.listen(3000);
});
