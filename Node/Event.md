# Events
The Node.js API is based on an event-driven architecture. It includes the events module, which provides the capability to create and handle custom events.

The event module contains EventEmitter class. The EventEmitter object emits named events. Such events call the listener functions. 
#### Creating an Event Emitter
```ts
// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
```
Bind an event handler with an event with the following syntax −
```ts
// Bind event and event  handler as follows
eventEmitter.on('eventName', eventHandler);
```
To fire the event programmatically −
```ts
// Fire an event 
eventEmitter.emit('eventName');
```

## EventEmitter Instance Should Be Singleton for a Single Event Name
In other words, the `on()` and the `emit()` functions must be called on the same EventEmitter instance.

The listeners won’t work if registered on a separate `EventEmitter` instance.
```ts
import { EventEmitter } from 'events';

const eventEmitter1 = new EventEmitter();
eventEmitter1.on('myEvent', () => {
    console.log('Listener');
});

const eventEmitter2 = new EventEmitter();
eventEmitter2.emit('myEvent');
```
## Maintaining a Single Event-Emitter Instance Applicationwide
A node application is generally 100s of files. This gets challenging to maintain by a single copy of the `EventEmitter` instance throughout the application.

There is a simple strategy to create and maintain a singleton copy for an `EventEmitter` instance.
When creating the `EventEmitter` instance, we can simply store it as an application-level setting using `app.set(<key>, <value>)`.
```ts
import { EventEmitter } from "events";
import express from 'express';

const eventEmitter = new EventEmitter();

const app = express();
app.set('eventEmitter', eventEmitter);

// access it from any module of the application
console.log(app.get('eventEmitter'));
```

## Event Emitter Synchronous
```ts
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (data) => {
    console.log(data);
});

console.log('Statement A');
eventEmitter.emit('myEvent', 'Statement B');
console.log("Statement C");
```

## Functions of the EventEmitter Class
### once()
Events listened with `once()` will be triggered only once.
Adds a one time listener to the event. This listener is invoked only the next time the event is fired, after which it is removed.
```ts
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", data => {
    console.log(data, "- ON");
});

eventEmitter.once("myEvent", data => {
    console.log(data, "- ONCE");
});

eventEmitter.emit("myEvent", "Emitted Statement");
eventEmitter.emit("myEvent", "Emitted Statement");
eventEmitter.emit("myEvent", "Emitted Statement");
```
### prependListener()
The `prependListener()` method can be used as an alternative to adding the event listener to the beginning of the listener array.
```ts
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", (arg) => console.log(arg, "- ON"));
eventEmitter.prependListener("myEvent", (arg) => console.log(arg, "- PREPENDLISTENER"));

eventEmitter.emit("myEvent", "Emitted Statement");
console.log(eventEmitter.eventNames());
```
`Emitted Statement - PREPENDLISTENER
Emitted Statement - ON
[ 'myEvent' ]`

### eventNames()
Get all the active event names.
```ts
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", data => console.log(data, "- ON"));
eventEmitter.on("myEvent2", data => console.log(data, "- ON"));
eventEmitter.once("myEvent3", data => console.log(data, "- ONCE"));

console.log(eventEmitter.eventNames());
eventEmitter.emit("myEvent3", 'EVENT');
console.log(eventEmitter.eventNames());
```
`[ 'myEvent', 'myEvent2', 'myEvent3' ]
EVENT - ONCE
[ 'myEvent', 'myEvent2' ]`

### addListener()
It’s exactly the same as `on()`. It’s just an alias for `event.on()`.

### removeListener()
This is used to remove a listener.
```ts
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

function func1(): void {
    console.log("EVENT TRIGGERED");
}

eventEmitter.on("myEvent", func1);
eventEmitter.on("myEvent2", func1);

console.log(eventEmitter.eventNames());
eventEmitter.removeListener("myEvent", func1);
console.log(eventEmitter.eventNames());
```
`[ 'myEvent', 'myEvent2' ]
[ 'myEvent2' ]`

### removeAllListeners()
This is used to remove all active event listeners from an EventEmitter instance.


