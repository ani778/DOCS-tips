# Class
In JavaScript, a `class` is a template for creating objects that share similar properties (data) and methods (functions). Introduced in ES6, the class 
keyword offers a cleaner, more structured syntax for implementing object-oriented programming (OOP) patterns, built on JavaScript's existing prototype-based inheritance model.

<b>Declaration</b>
```js
class Person {
    // The constructor method runs automatically when a new object is created
    constructor(name) {
        this.name = name; // Initialize a property
    }

    // Define a method (behavior)
    introduceSelf() {
        console.log(`Hi! I'm ${this.name}`);
    }
}

```
<b>Expression: the class is anonymous but assigned to a variable</b>
```js
const Rectangle = class {
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
}
```
<b>Expression: the class has its own name</b>
```js
const Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```
## Key Features
- `Constructor()`: The constructor method is a special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class
- `Methods`: Methods can be plain functions, async functions, generator functions, or async generator functions.They define the object's behaviors.
- `Inheritance`: The extends keyword allows one class to inherit properties and methods from another, promoting code reuse.
- `Encapsulation`: Bundles data and methods that operate on that data within a single unit.
- `Private fields`: Indicated by a `#` prefix, these fields are only accessible from within the class itself, providing true encapsulation.
```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
  *getSides() {
    yield this.height;
    yield this.width;
    yield this.height;
    yield this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
console.log([...square.getSides()]); // [10, 10, 10, 10]
```
## Static methods and fields
`Static` properties (fields and methods) are defined on the class itself instead of each instance.  Public `static fields`
are useful when you want a field to exist only once per class, not on every class instance you create.
This is useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

```js
class Triple {
    static customName = "Tripler";
    static description = "I triple any number you provide";
    static calculate(n = 1) {
        return n * 3;
    }
}

class SquaredTriple extends Triple {
    static longDescription;
    static description = "I square the triple of any number you provide";
    static calculate(n) {
        return super.calculate(n) * super.calculate(n);
    }
}

console.log(Triple.description); // 'I triple any number you provide'
console.log(Triple.calculate()); // 3
console.log(Triple.calculate(6)); // 18

const tp = new Triple();

console.log(SquaredTriple.calculate(3)); // 81 (not affected by parent's instantiation)
console.log(SquaredTriple.description); // 'I square the triple of any number you provide'
console.log(SquaredTriple.longDescription); // undefined
console.log(SquaredTriple.customName); // 'Tripler'

// This throws because calculate() is a static member, not an instance member.
console.log(tp.calculate()); // 'tp.calculate is not a function'
```

## Private elements
`Private` elements get created by using a hash `#` prefix and cannot be legally referenced outside of the class. 
They can only be read or written within the class body.
 It is also a syntax error to refer to private elements that were not declared in the class body, or to attempt to remove declared elements with **delete**.

```js
class ClassWithPrivate {
    #privateField;
    #privateFieldWithInitializer = 42;

    #privateMethod() {
    }

    static #privateStaticField;
    static #privateStaticFieldWithInitializer = 42;

    static #privateStaticMethod() {
    }
}

class ClassWithPrivateField {
    #privateField;

    constructor() {
        delete this.#privateField; // Syntax error
        this.#undeclaredField = 42; // Syntax error
    }
}

const instance = new ClassWithPrivateField();
instance.#privateField; // Syntax error
```
You can use the in operator to check whether an externally defined object possesses a private element. This will return true if the private field or method exists, and false otherwise.

```js
class C {
  #x;
  constructor(x) {
    this.#x = x;
  }
  static getX(obj) {
    if (#x in obj) return obj.#x;

    return "obj must be an instance of C";
  }
}
console.log(C.getX(new C("foo"))); // "foo"
console.log(C.getX(new C(0.196))); // 0.196
console.log(C.getX(new C(new Date()))); // the current date and time
console.log(C.getX({})); // "obj must be an instance of C"
```
## Inheritance
The `extend` keyword is used in class declarations or class expressions to create a class as a child of another constructor
If there is a constructor present in the subclass, it needs to first call `super()` before using this. 

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
      // super.speak();
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.
```
-----
`Private elements` are not part of the **prototypical inheritance model** since they can only be accessed 
within the current class's body and aren't inherited by subclasses. Private elements with the same name within different classes are 
entirely different and do not interoperate with each other.
 **structuredClone()** does not clone private elements, and **Object.freeze()** and **Object.seal()** have no effect on private elements.

### Returning overriding object
A class's constructor can return a different object, which will be used as the new this for the derived class constructor. 
The derived class may then define private fields on that returned object — meaning it is possible to "stamp" private fields 
onto unrelated objects.

```js
class Stamper extends class {
  // A base class whose constructor returns the object it's given
  constructor(obj) {
    return obj;
  }
} {
  // This declaration will "stamp" the private field onto the object
  // returned by the base class constructor
  #stamp = 42;
  static getStamp(obj) {
    return obj.#stamp;
  }
}

const obj = {};
new Stamper(obj);
// `Stamper` calls `Base`, which returns `obj`, so `obj` is
// now the `this` value. `Stamper` then defines `#stamp` on `obj`

console.log(obj); // In some dev tools, it shows {#stamp: 42}
console.log(Stamper.getStamp(obj)); // 42
console.log(obj instanceof Stamper); // false

// You cannot stamp private elements twice
new Stamper(obj); // Error: Initializing an object twice is an error with private fields
```
**Warning: This is a potentially very confusing thing to do. You are generally advised to avoid returning anything from the constructor — especially something unrelated to this.**

### Private static fields
- are added to the class constructor at class evaluation time,
- are only available on the class itself.


```js
class ClassWithPrivateStaticField {
  static #privateStaticField = 42;

  static publicStaticMethod() {
    return ClassWithPrivateStaticField.#privateStaticField;
    //if this.#privateStaticField;
  }
}
class Subclass extends ClassWithPrivateStaticField {
    static callSuperMethod() {
        return super.publicStaticMethod();
    }
}

Subclass.callSuperMethod(); // TypeError: Cannot read private member #privateStaticField from an object whose class did not declare it

console.log(ClassWithPrivateStaticField.publicStaticMethod()); // 42

Subclass.publicStaticMethod();// 42
//then TypeError: Cannot read private member #privateStaticField from an object whose class did not declare it
```
### Private instance methods
- are installed immediately before the instance fields are installed
- are only available on instances of the class, not on its .prototype property.

```js
class ClassWithPrivateMethod {
  #privateMethod() {
    return 42;
  }

  publicMethod() {
    return this.#privateMethod();
  }
}

const instance = new ClassWithPrivateMethod();
console.log(instance.publicMethod()); // 42
```
Private instance methods may be generator, async, or async generator functions. Private getters and setters are also possible, and follow the same syntax requirements as their public getter and setter counterparts.

```js
class ClassWithPrivateAccessor {
  #message;

  get #decoratedMessage() {
    return `🎬${this.#message}🛑`;
  }
  set #decoratedMessage(msg) {
    this.#message = msg;
  }

  constructor() {
    this.#decoratedMessage = "hello world";
    console.log(this.#decoratedMessage);
  }
}

new ClassWithPrivateAccessor(); // 🎬hello world🛑
```
### Private static methods
- are added to the class constructor at class evaluation time,
- are only available on the class itself.


```js
class ClassWithPrivateStaticMethod {
  static #privateStaticMethod() {
    return 42;
  }

  static publicStaticMethod() {
    return ClassWithPrivateStaticMethod.#privateStaticMethod();
  }
}

console.log(ClassWithPrivateStaticMethod.publicStaticMethod()); // 42
```

## Inheritance
For inheritance we use `extends` keyword.




