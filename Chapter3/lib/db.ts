/// <reference path="../../NodeJS/defines/node.d.ts" />


var mongoDb = require('mongodb').Db,
    mongoConnection = require('mongodb').Connection,
    mongoServer = require('mongodb').Server;

var envHost = process.env['MONGO_NODE_DRIVER_HOST'],
    envPort = process.env['MONGO_NODE_DRIVER_PORT'],
    host = (envHost != null) ? envHost : 'localhost',
    port = (envPort != null) ? envPort : mongoConnection.DEFAULT_PORT;

var db = new mongoDb('nockmarket',
    new mongoServer(host, port, {}),
    { native_parser: false });

module.exports = {
    find: function (name, query, limit, callback) {
        db.collection(name).find(query)
            .sor({ _id: -1 })
            .limit(limit)
            .toArray(callback);
    },

    findOne: function (name, query, callback) {
        db.collection(name).findOne(query, callback);
    },

    insert: function (name, items, callback) {
        db.collection(name).insert(items, callback);
    },

    insertOne: function (name, item, callback) {
        module.exports.insert(name, item, function (error, items) {
            callback(error, items[0]);
        });
    },

    open: function (callback) {
        db.open(callback);
    }
}

