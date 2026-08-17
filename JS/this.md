# What is the purpose of the this keyword in JavaScript?
The `this` keyword in JavaScript refers to the object that is executing the current function. Its value is determined by how
a function is called, not where it is defined. this is essential for writing object-oriented and event-driven code, as it allows methods to interact with the data of the object they belong to.

#### Example 1: this in a Global Context
```js
console.log(this);
```
- In a global context, this refers to the global object (e.g., window in a browser).

#### Example 2: this in a Function
```js
function displayThis() {
  console.log(this);
}

displayThis();
```
- In a regular function, this refers to the global object(window in browser and global in nodejs) for non-strict mode. In strict mode, it's value is undefined.

#### Example 3: this in a Method
```js
const person = {
  name: "John",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

person.greet();
```
- In a method, this refers to the object that owns the method (person in the case).

#### Example 4: this in an Event Handler
```js
 document.getElementById("myButton").addEventListener("click", function () {
          console.log(this);
 });
```
- this refers to the element that triggered the event (the button in this case).

#### Example 5: this with Arrow Functions
```js
      const obj = {
        age: 42,
        regular: function() { console.log(this.age); },
        arrow: () => { console.log(this.age); }
      };
      obj.regular(); // 42 (this refers to obj)
      obj.arrow();   // undefined (this refers to the outer scope, not obj)
```
- Arrow functions do not have their own this binding; they inherit it from their surrounding (lexical) context.

#### Example 6: this in Constructor Functions / Classes
```js
  function Person(name) {
    this.name = name;
  }
  
  const p1 = new Person('Sudheer');
  console.log(p1.name); // Sudheer
```
- When used with new, this refers to the newly created object.
