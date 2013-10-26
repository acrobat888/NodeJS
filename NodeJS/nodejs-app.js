
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http')
    , path = require('path')
    , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*
 * This handles the moving to the /form on the site
 */
app.get('/form', function (req, result) {
    fs.readFile('./form.html', function (error, content) {
        if (error) {
            result.writeHead(500);
            result.end();
        }
        else {
            result.writeHead(200, { 'Content-Type': 'text/html' });
            result.end(content, 'utf-8');
        }
    });
});

/*
 * This handles the /signup post request that is triggered by
 * the form.html input button
 */
app.post('/signup', function(inputs, results) {
    var username = inputs.body.username;
    var password = inputs.body.password;

    Users.addUser(username, password, function (error, user) {
        if (error)
            throw error;

        results.redirect('/form');
    });
});