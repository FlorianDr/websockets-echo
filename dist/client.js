'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _net = require('net');

var _tls = require('tls');

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var options = {
  host: 'echo.dreschner.eu',
  port: 1337
};

var optionsTLS = {
  host: 'echo.dreschner.eu',
  port: 4337,
  key: (0, _fs.readFileSync)(_path2['default'].resolve(__dirname, '../client-key.pem')),
  cert: (0, _fs.readFileSync)(_path2['default'].resolve(__dirname, '../client-cert.pem')),
  ca: [(0, _fs.readFileSync)(_path2['default'].resolve(__dirname, '../server-cert.pem'))]
};

function request(socket, msg) {
  socket.setEncoding('utf8');
  socket.on('data', function (data) {
    console.log(data);
  });
  socket.write(msg);
}

var socket = (0, _net.connect)(options, function () {
  console.log('Connected to server.');
});

var tlsSocket = (0, _tls.connect)(optionsTLS, function () {
  console.log('Connected to server.');
});

request(socket, 'Hello Socket!');
request(tlsSocket, 'Hello TLSSocket!');