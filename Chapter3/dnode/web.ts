/*
// Interface
interface IPoint {
    getDist(): number;
}

// Module
module Shapes {

    // Class
    export class Point implements IPoint {
        // Constructor
        constructor (public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        // Static member
        static origin = new Point(0, 0);
    }

}

// Local variables
var p: IPoint = new Shapes.Point(3, 4);
var dist = p.getDist();
*/
/// <reference path="../../NodeJS/defines/node.d.ts" />

var dnode = require('dnode'),
    http = require('http'),
    qs = require('querystring');

var connection = dnode.connect('localhost', 8090);

connection.on('remote', function (remote) {
    http.createServer(function (req, resultServer) {
        if (req.url.match(/^\/login/)) {
            var param = qs.parse(req.url.split('?')[1]);

            remote.auth(param.user, param.pass, function (error, resultAuth) {
                resultServer.end(error ? error : resultAuth);
            });
        }
    }).listen(process.argv[2]);
});
