//
//

var http = require('http');
var options = {
    host: 'download.finance.yahoo.com',
    port: 80,
    path: '/d/quotes.csv?s=AAPL,FB,GOOG,MSFT&f=sl1c1d1&e=.csv'
};

http.get(options, function (result) {
    var data = '';
    result.on('data', function (chunk) {
        data += chunk.toString();
    })
        .on('error', function (error) {
            console.error('Error retrieving Yahoo stock prices');
            throw error;
        })
        .on('end', function () {
            console.log(data);
        });
});

