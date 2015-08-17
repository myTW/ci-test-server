var dgram = require("dgram");
var assert = require("assert");
var message = new Buffer("status");
var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");

var REMOTE = "10.29.2.234";
var selfPort = 41234;
var remotePort = 41235;

server.bind(selfPort, '0.0.0.0');

describe('client', function () {

    before(function () {

        client.send("status", 0, "status".length, remotePort, REMOTE, function (err) {
            client.close();
        });
    });

    it('should report led status', function (done) {
        server.on("message", function (msg, rinfo) {
            console.log('msg: ' + msg);
            assert.equal("1", msg.toString().trim('\n'));
            done();
            server.close();
        });
    });
});
