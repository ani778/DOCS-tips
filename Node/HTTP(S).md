# HTTP(S)
Node.js has a built-in module called HTTP/HTTPS, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).

HTTPS is HTTP with encryption. The difference between the two protocols is that HTTPS uses TLS (SSL) to encrypt normal HTTP requests and responses. As a result, HTTPS is far more secure than HTTP.

## Running HTTP Web Server
The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.

Use the `createServer()` method to create an HTTP server:
```ts
const http = require('http');

const port = 4000;

const server = http.createServer((req, res) => {
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`);
});
```
The function passed into the http.createServer() method, will be executed when someone tries to access the computer on port 4000.

## Add an HTTP Header
If the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type:
```ts
const http = require('http');

const port = 4000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`);
});
```
### Working with the Query String
The function passed into the http.createServer() has a req argument that represents the request from the client. This object has a property called url (read more about this module here) which holds the part of the url that comes after the domain name.
```ts
const http = require('http');
const url = require('url');

const port = 4000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  const { query } = url.parse(req.url, true);
  const date = query.year + " " + query.month;

  res.end(date);
});

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`);
});
```
## HTTPS
To built an `HTTPS` server with Node.Js, we need an `SSL (Secure Sockets Layer)` certificate.

Speaking generally, there are two kinds of certificates: those signed by a 'Certificate Authority', or CA, and 'self-signed certificates'. 

