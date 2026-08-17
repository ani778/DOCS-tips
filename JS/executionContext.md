<h1>Execution Context – How JS Works Behind The Scenes</h1>

Browser doesn't natively understand the high-level JavaScript code that we write in our applications. It needs to be converted 
into a format that the browser and our computers can understand – machine code.
While reading through HTML, if the browser encounters `JavaScript code` to run via a `<script>` tag or an attribute
that contains JavaScript code like `onClick`, it sends it to its <b>JavaScript engine.</b></br>
JavaScript engine then creates a special environment to handle JavaScript code.This environment is known as the `Execution Context`.

There are two kinds of Execution Context in JavaScript:

- Global Execution Context (GEC)
- Function Execution Context (FEC)
### Global Execution Context (GEC)
Whenever the JavaScript engine receives a script file, it first creates a default Execution Context known as the `Global Execution Context (GEC)`.

<b>For every JavaScript file, there can only be one GEC.</b>
### Function Execution Context (FEC)
Whenever a function is called, the JavaScript engine creates a `Function Execution Context (FEC)` within the GEC.

<b>Since every function call gets its own FEC, there can be more than one FEC in the run-time of a script.</b>
## How are Execution Contexts Created?

The creation of an Execution Context (GEC or FEC) happens in two phases:

- Creation Phase
- Execution Phase
### Creation Phase
The creation phase occurs in 3 stages, during which the properties of the Execution Context Object are defined and set.
1. Creation of the Variable Object (VO)
2. Creation of the Scope Chain
3. Setting the value of the `this` keyword
### Creation Phase: Creation Of The Variable Object (VO)
The Variable Object (VO) is an object-like container created within an Execution Context. It stores the variables and function declarations defined within that Execution Context.

Also, for every function declaration, a property is added to the VO, pointing to that function, and that property is stored in memory. This means that all the function declarations will be stored and made accessible inside the VO, even before the code starts running.

### Hoisting in JavaScript
Function and variable declarations are hoisted in JavaScript. This means that they are stored in memory of the current Execution Context's VO and made available within the Execution Context even before the execution of the code begins.

#### Function Hoisting
The greet function declaration will be stored in the memory of the VO, making it available for use even before it is defined.
```js
   greet(); // Output: Hello!
    function greet() {
        console.log("Hello!");
    }
```
Hoisting only works for function declarations, not expressions.
```js
getAge(1990); 
var getAge = function (yearOfBirth) {
console.log(new Date().getFullYear - yearOfBirth) 
};
```
`getAge` will be hoisted as a variable not as a function. And with variable hoisting, its value will be set to undefined.

#### Variable Hoisting
Variables initialized with the `var` keyword are stored in the memory of the current Execution Context's VO as a property, and initialized with the value `undefined`.
```js
console.log(greetings) //undefined

var greetings = "Hello world!"
```
Also, variable hoisting does not work for variables initialized with the `let` or `const` keyword. Trying to access a variable ahead of declaration and use the let and const keywords to declare it later will result in a `ReferenceError.`

### Creation Phase: Creation of The Scope Chain
In JavaScript, scope defines the accessibility of variables, functions, and objects within a particular part of the code. It determines where a variable can be declared and from where it can be accessed.
#### There are primarily three types of scope in JavaScript: 
- Global Scope:
```js
    let globalVar = "I am global";

    function printGlobal() {
      console.log(globalVar); // Accessible here
    }
    printGlobal();
    console.log(globalVar); // Accessible here
```
- Function Scope (Local Scope)
```js
    function exampleFunction() {
      var functionVar = "I am inside a function";
      console.log(functionVar); // Accessible here
    }
    exampleFunction();
    // console.log(functionVar); // Error: functionVar is not defined
```
- Block Scope:
```js
    if (true) {
      let blockVar = "I am inside a block";
      console.log(blockVar); // Accessible here
    }
    // console.log(blockVar); // Error: blockVar is not defined
```
#### Key Concepts:
- <b>Scope Chain:</b> JavaScript first looks for it in the current scope. If not found, it looks in the immediate outer scope, and so on, until it reaches the global scope. This hierarchical search is known as the scope chain.
- <b>Shadowing:</b> If a variable in an inner scope has the same name as a variable in an outer scope, the inner variable "shadows" the outer one within its own scope, meaning the inner variable takes precedence.
- <b>Closures:</b> Closures are a powerful concept related to scope, where a function "remembers" the environment (scope) in which it was created, even after that environment has finished executing. This allows inner functions to access variables from their outer (enclosing) functions.

### Creation Phase: Setting The Value of The "this" Keyword
In JavaScript, the `this` keyword is a special identifier that refers to the context in which a function is executed. 
Its value is determined at runtime, based on how the function is called, rather than where it is defined. This dynamic binding can lead to different this values in various scenarios:
- **Global Context**: When `this` is used outside of any function in a browser environment, it refers to the global `window` object. In Node.js, it refers to the global object. In `strict mode, this` in a global function call is `undefined`.
```js
    console.log(this); // In a browser, this would be the window object
```
- **Object Methods:** When a function is called as a method of an object, this refers to the object itself. 
```js
    const person = {
        name: "Alice",
        greet: function() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
    person.greet(); // Output: Hello, my name is Alice (this refers to person)
```
- **Standalone Functions:** When a regular function is called directly (not as a method of an object), this typically refers to the global object (e.g., window in browsers) in non-strict mode. In strict mode, it is undefined
```js
    function sayHello() {
        console.log(this); // In non-strict mode (browser), this would be the window object
    }
    sayHello();
```
- **Event Handlers:** In event handlers, this typically refers to the HTML element that the event listener is attached to. 
```js
    const button = document.getElementById('myButton');
    button.addEventListener('click', function() {
        console.log(this); // This refers to the button element
    });
```
- **Arrow Functions:** Arrow functions handle this differently. They do not have their own this binding; instead, they lexically inherit this from their parent scope at the time they are defined. 
```js
    const obj = {
        value: 10,
        getValue: function() {
            setTimeout(() => {
                console.log(this.value); // This refers to obj, inherited from parent scope
            }, 100);
        }
    };
    obj.getValue(); // Output: 10
```

- `call()`, `apply()`, and `bind()`: These methods allow explicit control over the `this` value.
  1. `call()` immediately invoke a function with a specified `this` value and arguments.
  2. `apply()` Invokes a function immediately with a specified this value and arguments provided as an array.
  3. `bind()`Returns a new function with a specified this value and optionally, pre-set arguments. The function is not invoked immediately.

```js
    const person = { name: "Alice" };
    function greet(greeting) {
      console.log(`${greeting}, my name is ${this.name}`);
    }
    greet.call(person, "Hello"); // Output: Hello, my name is Alice
```
```js
    const person = { name: "Bob" };
    function greet(greeting, punctuation) {
      console.log(`${greeting}, my name is ${this.name}${punctuation}`);
    }
    greet.apply(person, ["Hi", "!"]); // Output: Hi, my name is Bob!
```
```js
    const person = { name: "Charlie" };
    function greet(greeting) {
      console.log(`${greeting}, my name is ${this.name}`);
    }
    const boundGreet = greet.bind(person, "Greetings");
    boundGreet(); // Output: Greetings, my name is Charlie
```

### Key Differences:
- <b>Execution:</b> `call()` and `apply()` execute the function immediately, while `bind()` returns a new function that can be executed later.
- <b>Argument Handling:</b> `call()` takes arguments individually, `apply()` takes arguments as an array, and `bind()` can pre-set arguments individually for the returned function.

![img.png](../images/img.png)

## JavaScript Execution Stack (Call Stack) 
JavaScript is a `single-threaded` language, which means that it is capable of only executing a single task at a time. 

When scripts load in the browser, the Global context is created as the default context where the JS engine starts executing code and is placed at the bottom of the execution stack.

The JS engine then searches for function calls in the code. For each function call, a new FEC is created for that function and is placed on top of the currently executing Execution Context.

The Execution Context at the top of the Execution stack becomes the active Execution Context, and will always get executed first by the JS engine.

As soon as the execution of all the code within the active Execution Context is done, the JS engine pops out that particular function's Execution Context of the execution stack, moves towards the next below it, and so on.

```js
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

pokemonName.call(pokemon,'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
pokemonName.apply(pokemon,['sushi', 'algorithms']); // Pika Chu  loves sushi and algorithms


var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + 'I choose you!');
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now

logPokemon('sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
```

