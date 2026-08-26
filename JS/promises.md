# Promises
A **Promise is an object** representing the eventual completion or failure of an asynchronous operation.
It provides a structured way to handle asynchronous code, offering a cleaner and more manageable alternative to traditional callback functions.

### A Promise can be in one of three states:
- **Pending**: The initial state; the asynchronous operation has not yet completed.
- **Fulfilled (Resolved):** The operation completed successfully, and the promise now holds a resulting value.
- **Rejected:** The operation failed, and the promise holds a reason for the failure (an error).
The function passed to **new Promise** is called the **executor.** When new Promise is created, the executor runs automatically.
Its arguments **resolve and reject** are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, it should call one of these callbacks:
- **resolve(value)** — if the job is finished successfully, with result value.
- **reject(error)** — if an error has occurred, error is the error object.

**There can be only a single result or an error**

### Handling Promise Results
To react to the outcome of a Promise, you use:
- **then()** Runs when the Promise is fulfilled.
- **catch()** Runs when the Promise is rejected.
- **finally()** Runs regardless of whether the Promise was fulfilled or rejected. Useful for cleanup logic.

## Promises chaining
Promise chaining is executing a sequence of asynchronous operations in a specific order

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```
## Promise API
There are 6 static methods in the Promise class.
### Promise.all
Many promises to execute in parallel and wait until all of them are ready.
**Promise.all** takes an array of promises and returns a new promise. The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```
**Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.**

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```
**If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error. In case of an error, other promises are ignored**

### Promise.allSettled
**Promise.allSettled** just waits for all promises to settle, regardless of the result.The resulting array has:
- **:"fulfilled", value:result}** for successful responses,
- **{status:"rejected", reason:error}** for errors.

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });

//results
[
    {status: 'fulfilled', value: response},
    {status: 'fulfilled', value: response},
    {status: 'rejected', reason: error}
]

```
### Promise.race
Waits only for the first settled promise and gets its result (or error).

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
]).then(alert).catch(e => alert(e)); // Alerts "Error: Whoops!" after 1 second
```
### Promise.any
Similar to Promise.race, but waits only for the first fulfilled promise and gets its result.
. If all of the given promises are rejected, then the returned promise is rejected with AggregateError

```js
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
});
```

### What is the difference between return and return await in async functions
In an `async` function, `return value` simply returns the value or promise. If the value is a rejected promise, the rejection is not caught by a surrounding `try/catch` unless you `await` it first.

`return await value` pauses the function until the promise settles, so a `try/catch` around it can handle errors properly
