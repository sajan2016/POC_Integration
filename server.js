var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var test = require('./server/routes/test.routes')
var port = 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use('/', test)

/*var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }*/
    /*app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    */

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

io.on('connection', (socket) => {
    console.log('new connection made');

    socket.on('event1', (data) => {
        console.log(data.msg);
    });

    socket.emit('event2', {
        msg: 'Server to client, do you read me? Over.'
    });

    socket.on('event3', (data) => {
        console.log(data.msg);
        socket.emit('event4', {
            msg: 'Loud and clear :)'
        });
    });

});

server.listen(port, () => {
    console.log("Listening on port " + port);
});