# Child Process
In Node.js, the `child_process` module allows you to create and manage child processes. This is useful for executing external commands, running scripts, or performing tasks in parallel

The `child_process` module provides the ability to spawn new processes which has their own memory. The communication between these processes is established through IPC (inter-process communication) provided by the **operating system.**.

The `Child Process` module is included in Node.js by default.
```js
const childProcess = require('child_process');

// Or using destructuring to access specific methods
const { exec, spawn, fork } = require('child_process');
```

The **Child Process module** provides four primary methods for creating and managing child processes:
- exec()
- execFile()
- fork()
- spawn()
  <img width="1227" height="378" alt="image" src="https://github.com/user-attachments/assets/4ec718c8-fd88-4219-9617-573963d3cb34" />

  

## exeq()
This method will spawn a shell and execute the command in that shell and buffer generated data.
```ts
const { exec } = require('child_process');

const execProcess = (command) => {
  exec(command, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
}

execProcess('node -v');
```
The method `exec()` accepts the following arguments:
- ` command`that will be run, with space-separated arguments
- `options `(optional)
- `callback `  (optional), which is called with the output when the process terminates.
  - `error` - error in JavaScript
  - `stdout` - the standard output stream, which is a source of output from the program
  - `stderr` - the standard error stream, which is used for error messages and diagnostics issued by the program
    
## execFile()
If you need to execute a file without using a shell, the `execFile()` function is what you need. It behaves exactly like the `exec()` function but does not use a shell, which makes it a bit more efficient.
```ts
const childProcess = require('child_process');

const execFile = (command, args) => {
  childProcess.execFile(command, args, (error, stdout, stderr) => {

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
}

execFile('node', ['-v']);
```
## spawn()
The spawn method creates a new process by executing a command with stream manipulation. 
```ts
const childProcess = require('child_process');

const spawnProcess = (command, args) => {
  const process = childProcess.spawn(command, args);
  let fullData = '';
  let dataChunks = 0;

  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  process.stdout.on('data', (data) => {
    fullData += data;
    dataChunks += 1;
    console.log(`stdout: ${data}`);
  });

  // end of data stream, there we can output the data
  process.stdout.on('end', () => {
    console.log(`end: ${fullData}`);
    console.log(`chunks: ${dataChunks}`);
  });

  // event when process is finished
  // there we can get to know with what code it was ended (0 - success, 1 - error)
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

spawnProcess('node', ['-v']);
```
## fork()
The `fork()` method is a special case of `spawn() `where the parent and the child process can communicate with each other via `send()` (but child processes cannot communicate with each other).
```ts
//app.js
const { fork } = require('child_process');

const child = fork('./child.js');

child.on('message', (message) => {
  console.log('Parent process received:', message);
});

child.send({ hello: 'from parent process' });

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

//child.js
process.on('message', (message) => {
  console.log('Child process received:', message);
});

process.send({ hello: 'from child process' });
```
```ts
Child process received: { hello: 'from parent process' }
Parent process received: { hello: 'from child process' }
```

### Benefits of fork()
- Each forked process gets its own V8 instance and memory
- Isolates CPU-intensive work from the main event loop
- Allows communication between processes via messages
- Helps utilize multiple CPU cores

  
## How to decide which method to use?

![img_1.png](../images/img_1.png)

## Interprocess Communication (IPC)
Child processes created with `fork()` can communicate with the parent process through a built-in IPC channel using `send()` and the `message` event.
```js
// In parent.js
const { fork } = require('child_process');
const child = fork('worker.js');

// Send different types of data
child.send({
  command: 'compute',
  data: [1, 2, 3, 4, 5],
  options: {
    multiply: 2,
    subtract: 1
  }
});

// Receive the result
child.on('message', (result) => {
  console.log('Computation result:', result);
  child.disconnect(); // Clean up the IPC channel
});
```
```js
// In worker.js
process.on('message', (msg) => {
   if (msg.command === 'compute') {
    const result = msg.data.map(num => num * msg.options.multiply - msg.options.subtract);

    // Send the result back to the parent
    process.send({ result });
  }
});
```
### Killing a Child Process with `child.kill()`

### Detached Processes
You can create detached child processes that continue running independently of the parent:`child.unref()`


## Choose the Right Method:
- Use `exec()` for simple commands with limited output
- Use `spawn()` for long-running processes or large outputs
- Use `fork()` for CPU-intensive Node.js operations
