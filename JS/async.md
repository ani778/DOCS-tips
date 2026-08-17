# Async/await

There’s a more comfortable way to work with promises, called `async/await`

### async
After calling `async` function return `Promise.` Async functions can contain zero or more await expressions.

### await
The keyword `await` makes JavaScript wait until that promise settles and returns its result.
```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```
### Error handling
We can catch that error using `try..catch` the same way as a regular `throw`:
```ts
async function f() {
    // throw new Error("Whoops!");
  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```