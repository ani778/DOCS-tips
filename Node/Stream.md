# Streams
A stream is a collection of data.
However, unlike an array or a string, the entire data in a stream object is not stored at once in the memory. Instead, a single chunk of data from the stream is brought into the memory, at a time.
For example:
`Node.js based HTTPs server, request is a readable stream and response is a writable stream. But while an HTTPs response is a writable stream on the server, it’s a readable stream on the client. `
##### Streams provide memory efficiency and performance benefits. 

## Types of streams
### Readable streams
A `readable stream` can read data from a particular data source, most commonly, from a file system. 
- `process.stdin` - To read user input via stdin in a terminal application.
- `http.IncomingMessage `- To read an incoming request's content in an HTTP server or to read the server HTTP response in an HTTP client.
### Writable streams
You use `writable streams `to write data from an application to a specific destination, for example, a file.
`process.stdout` can be used to write data to standard output and is used internally by console.log.
### Duplex streams
A duplex stream is a combination of both readable and writable streams. It provides the capability to write data to a particular destination and read data from a source.

It's important to know that readable and writable sides operate independently from one another in a duplex stream. The data does not flow from one side to the other.
### Transform streams
A transform stream is slightly similar to a duplex stream, but the readable side is connected to the writable side in a transform stream.

## Advantages working with streams
- Efficient memory usage - With streams, large amounts of data do not need to be loaded into memory, reducing the number of reads and write cycles required to perform operations.
- Better performance - With streams, there is higher data processing throughput since data is processed as soon as it becomes available rather than waiting for all the data to arrive and then process it.
- Increased composability - With streams, developers can compose complex applications that interconnect data between multiple pieces of code or even across applications. This benefit allows developers to build microservices with Node.js.
- Real-time applications - Streams are essential for creating real-time applications such as video streaming or chat applications.

# Readable stream
```ts
const Stream = require('stream')
const readableStream = new Stream.Readable()
readableStream.push('ping!')
readableStream.push('pong!')
```

## Two Reading Modes
Readable streams effectively operate in one of two modes: flowing and paused. 

In `flowing mode`, data is read continuously and provided to the application using events from the EventEmitter. These events include
- Data event - This event is raised whenever data is available to be read by a stream.
- End event - This event is raised when the stream reaches the end of the file, and no more data is available to read.
- Error event - This event is raised when an error occurs during the read stream process. This event is also raised when using writable streams.
- Finish event - This event is raised when all data has been flushed to the underlying system.

##### In a flowing mode, to read data from a stream, it’s possible to listen to data event and attach a callback. When a chunk of data is available, the readable stream emits a data event and your callback executes.
```ts
const fs = require("fs");
let data = '';

let readerStream = fs.createReadStream('file.txt'); //Create a readable stream

readerStream.setEncoding('UTF8'); // Set the encoding to be utf8. 

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
    data += chunk;
});

readerStream.on('end',function() {
    console.log(data);
});

readerStream.on('error', function(err) {
    console.log(err.stack);
});

console.log("Program Ended");
```

In `paused mode`, you just need to call read() on the stream instance repeatedly until every chunk of data has been read, like in the following example:
```ts
const fs = require('fs');
let readableStream = fs.createReadStream('file.txt');
let data = '';
let chunk;

readableStream.on('readable', function() {
    while ((chunk=readableStream.read()) != null) {
        data += chunk;
    }
});

readableStream.on('end', function() {
    console.log(data)
});
```
The read() function reads some data from the internal buffer and returns it. When there is nothing to read, it returns null. So, in the while loop, we check for null and terminate the loop. Note that the readable event is emitted when a chunk of data can be read from the stream.

![img.png](../images/img.png)

All `Readable` streams begin in `paused mode` but can be switched to `flowing mode` in one of the following ways:
- By adding a ‘data’ event handler to the stream.
- By calling the s`tream.resume()` method.
- By calling the `stream.pipe()` method, which sends data to writable streams.

The` Readable` can switch back to `paused mode` using one of the following:
- If there are no pipe destinations, by calling the `stream.pause()` method.
- If there are pipe destinations, by removing all pipe destinations. Multiple pipe destinations may be removed by calling the `stream.unpipe()` method.

## Writable stream
To write data to a writable stream you need to call `write()` on the stream instance. Like in the following example:
```ts
const fs = require('fs');
const readableStream = fs.createReadStream('file1.txt');
const writableStream = fs.createWriteStream('file2.txt');

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    writableStream.write(chunk);
});
```
## pipeline()
Piping is a mechanism where we provide the output of one stream as the input to another stream. It is normally used to get data from one stream and to pass the output of that stream to another stream. There is no limit on piping operations. 
```ts
var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

console.log("Program Ended");
```
In Node 10.x was introduced `stream.pipeline()`. This is a module method to pipe between streams forwarding errors and properly cleaning up and provide a callback when the pipeline is complete.
```ts
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
// A pipeline to gzip a potentially huge video file efficiently:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```























