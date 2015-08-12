'use strict';

import {Socket, createServer} from 'net';
import {TLSSocket, createServer as createTLSServer} from 'tls';
import {readFileSync} from 'fs';
import * as path from 'path';

// Read cert and key
let tlsOptions = {
  key : readFileSync(path.resolve(__dirname, '../key.pem')),
  cert : readFileSync(path.resolve(__dirname, '../cert.pem'))
};

// 'Connection' event handler
function respond(socket){
  console.log(`Client from ${socket.remoteAddress} connected`);
  // Respond with request
  socket.on('data', function(msg) {
    socket.write(msg);
  });
  // Received FIN packet
  socket.on('end', function() {
    console.log(`Client from ${socket.remoteAddress} disconnected`);
  });
  // Received error
  socket.on('error', function(error) {
    console.error(`Client from ${socket.remoteAddress} had an error`, error);
  });
};

// Create servers and listen on ports
let server = createServer(respond).listen(1337);
let tlsserver = createTLSServer(tlsOptions, respond).listen(4337);

server.on('listening', () => console.log('Server is listening on 1337'));
tlsserver.on('listening',() => console.log('TLSServer is listening on 4337'));
