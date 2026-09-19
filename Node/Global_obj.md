# Global Objects
The Global Objects in the Node.js are accessible from anywhere in the application without needing to require or import them explicitly. These objects provides the functionalities such as working with files, streams and process the information.

### console
The console object is used to print the messages to the console and debug applications. It provides the various methods.
```js
console.log() − It outputs a standard message.

console.warn() − It displays a warning message.

console.error() − It shows an error message.

console.debug() − It is used for debugging purposes.
```

### process
The **process** object in the Node.js is used to provide the detailed information and control over the running Node.js process. It allows the users to interact with the system environment,
```js
console.log("Process ID:", process.pid);
console.log("Node.js Version:", process.version);
console.log("Command-line arguments:", process.argv);
console.log("Process Uptime:", process.uptime(), "seconds");
console.log("Current Working Directory:", process.cwd());
console.log("Memory Usage:", process.memoryUsage());

Output:
Process ID: 40096
Node.js Version: v22.13.1
Command-line arguments: [ 'C:\\Program Files\\nodejs\\node.exe' ]
Process Uptime: 5078.9264602 seconds
Memory Usage: {
  rss: 43954176,
  heapTotal: 7614464,
  heapUsed: 6585976,
  external: 2339203,
  arrayBuffers: 395682
}
```

### __dirname and __filename
The **__dirname and __filename** are  provides the information about the location of the currently executing script.
```js
console.log("Directory Name:", __dirname);
console.log("File Name:", __filename);

Output:
Directory Name: C:\Users\Lenovo
File Name: C:\Users\Lenovo\test.js
```

### Timers
The **Timers** in the Node.js provides a way to execute the code after a delay or at the fixed interval.

#### setTimeout()
It executes the function once after a specified delay and returns the Timeout object, which can be cleared by using the `clearTimeout().`
```js
let x = setTimeout(() => {
    console.log("Executed after 5 seconds");
}, 5000);
clearTimeout(x);
```
#### setInterval
It executes the function repeatedly at a fixed interval and returns the interval object , which can be cleared using the `clearInterval().`
```js
let z = setInterval(() => {
    console.log("Runs every 3 seconds");
}, 5);
clearInterval(z);
```

### Buffer
The **Buffer** class is used to for handling the binary data in the Node.js. 
It allows direct manipulation of the memory, making it useful for working with streams, file systems and networking.



