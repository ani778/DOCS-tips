# Generators
Generators can return `yield` multiple values, one after another.
When **Generator functions** is called it doesn’t run its code. Instead it returns a special object, called `generator object`, 
to manage the execution.

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
```
The main method of a generator is `next()`.
The result of **next()** is always an object with two properties:
- `value`:the yielded value.
- `done`: true if the function code has finished, otherwise false
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}
```

### Generators are iterable
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
//We can call it with spread sintax
let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

### Generator composition
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```
`yield` is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

### generator.throw
```js
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)
```

## Async generators (finally)
```js
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }

})();
```