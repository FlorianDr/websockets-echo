# websockets-echo
> A very simple node WebSockets project for testing purposes.
> After connecting, it simply echos your inputs.

## Setup
Clone this repository into your working directory. Put your cert.pem and key.pem
in the same directory.

Start server:

```bashp
npm start
```

## Generating TLS certificates
Generating unsigned certificate.

```bashp
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## Connecting with telnet to unsecure server
Replace your-address with server address. If server is running on your machine,
use localhost.

```bashp
telnet your-address 1337
```

## Connecting with telnet to secure server
Replace your-address with server address. If server is running on your machine,
use localhost.

```bashp
openssl s_client -connect your-address:4337
```

## LICENSE
[MIT](https://raw.githubusercontent.com/benno208/websockets-echo/master/LICENSE)
