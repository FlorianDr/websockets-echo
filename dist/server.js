'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _net = require('net');

var _tls = require('tls');

var _fs = require('fs');

var _path = require('path');

var path = _interopRequireWildcard(_path);

// Read cert and key
var tlsOptions = {
  key: (0, _fs.readFileSync)(path.resolve(__dirname, '../key.pem')),
  cert: (0, _fs.readFileSync)(path.resolve(__dirname, '../cert.pem'))
};

// 'Connection' event handler
function respond(socket) {
  console.log('Client from ' + socket.remoteAddress + ' connected');
  // Respond with request
  socket.on('data', function (msg) {
    socket.write(msg);
  });
  // Received FIN packet
  socket.on('end', function () {
    console.log('Client from ' + socket.remoteAddress + ' disconnected');
  });
  // Received error
  socket.on('error', function (error) {
    console.error('Client from ' + socket.remoteAddress + ' had an error', error);
  });
};

// Create servers and listen on ports
var server = (0, _net.createServer)(respond).listen(1337);
var tlsserver = (0, _tls.createServer)(tlsOptions, respond).listen(4337);

server.on('listening', function () {
  return console.log('Server is listening on 1337');
});
tlsserver.on('listening', function () {
  return console.log('TLSServer is listening on 4337');
});