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

var dnode = require('dnode');

dnode(function (remote, connection) {
    this.auth = function (user, pass, callback) {
        var users = { foo: 'bar' };
        var p = users[user];

        if (p == pass)
            callback(null, 'AUTHORIZED!');
        else
            callback('REMOTE ACCESS DENIED');
    };
}).listen(process.argv[2]);



