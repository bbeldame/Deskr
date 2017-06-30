

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

io.origins('*:*');

socket.on('open-mail', function() {
    var url = "mail_open.html";
    window.location = url;
})

