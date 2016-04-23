var express = require('express');
var app = express();
var websockets = require('./websockets')
var logger = require('morgan')

app.use(logger('dev'))
app.use(require('./controller'));

var port = process.env.PORT || 3000

var server = app.listen(port, function() {
    console.log('Server', process.pid, 'listening on',port);

});
websockets.connect(server)