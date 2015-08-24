'use strict';

import {connect} from 'net';
import {connect as connectTLS} from 'tls';
import {readFileSync} from 'fs';
import path from 'path';

const options = {
  host : 'echo.dreschner.eu',
  port : 1337
};

const optionsTLS = {
  host : 'echo.dreschner.eu',
  port : 4337,
  key : readFileSync(path.resolve(__dirname, '../client-key.pem')),
  cert : readFileSync(path.resolve(__dirname, '../client-cert.pem')),
  ca: [ readFileSync(path.resolve(__dirname, '../server-cert.pem')) ]
};


function request(socket, msg) {
  socket.setEncoding('utf8');
  socket.on('data', (data)=>{
    console.log(data);
  });
  socket.write(msg);
}

let socket = connect(options, ()=>{
  console.log('Connected to server.');
});

let tlsSocket = connectTLS(optionsTLS, ()=>{
  console.log('Connected to server.');
});

request(socket, 'Hello Socket!');
request(tlsSocket, 'Hello TLSSocket!');
