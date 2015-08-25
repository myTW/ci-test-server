var dgram = require("dgram");

var selfPort = 41236;
var server = dgram.createSocket("udp4");

server.bind(selfPort, '0.0.0.0');

server.on("message", function (msg, rinfo) {
    console.log('msg: ' + msg);
});


var REMOTE = "localhost";
var remotePort = 10001;
var client = dgram.createSocket("udp4");

client.send("status", 0, "status".length, remotePort, REMOTE, function (err) {
    client.close();
});