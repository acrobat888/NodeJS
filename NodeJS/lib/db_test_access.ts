
// Utilities
/// <reference path="../defines/node.d.ts" />
/// <reference path="../defines/mongoose.d.ts" />

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

//
// Connect to the cloud db
//
var username = "tstdbuser";
var password = "1234AbCd";
var address = '@ds051858.mongolab.com:51858/bpost_test_db1'

// 
// Connect
// 
connect();

// 
// Functions to help
//
function connect() {
    var url = 'mongodb://' + username + ':' + password + address;
    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}