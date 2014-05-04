//
/// <reference path="../../NodeJS/defines/node.d.ts" />

'use strict';

var nocklib = require('../lib/nocklib');

module.exports = {
    getIndex: function (request, result) {
        result.render('index');
    },

    signup: function (request, result) {
        console.log("Called signup function");

        nocklib.createUser(request.body.username,
            request.body.email,
            request.body.password,
            function (error, user) {
                console.log('created user', user);
                result.redirect('/portfolio');
            });
    }
}
