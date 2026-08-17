# Map
Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

Methods and properties are:
- ```new Map()```- creates the map.
- ```map.set(key, value) ```– stores the value by the key.
- ```map.get(key)``` – returns the value by the key, undefined if key doesn’t exist in map.
- ```map.has(key)``` – returns true if the key exists, false otherwise.
- ```map.delete(key) ```– removes the element (the key/value pair) by the key.
- ```map.clear()``` – removes everything from the map.
- ```map.size ```– returns the current element count.
```ts
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```
## Iteration over Map
For looping over a map, there are 3 methods:
- ```map.keys() ```– returns an iterable for keys,
- ```map.values()``` – returns an iterable for values,
- ``map.entries()`` – returns an iterable for entries [key, value]
```ts
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

# WeakMap
A `WeakMap` object is a collection of key/value pairs in which the keys are weakly referenced.`WeakMap` keys must be objects.
If we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.
```ts
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
```
### Methods available on WeakMap
- weakMap.set(key, value)
- weakMap.get(key)
- weakMap.delete(key)
- weakMap.has(key)

### Differences between WeakMap and Map
- `Map` can store any key type whereas `WeakMap` can store only collections of key objects
- `WeakMap` does not have `size` property unlike Map
- `WeakMap` does not have methods such as `clear`, `keys`, `values`, `entries`, `forEach`.
- `WeakMap` is not iterable.


# Set
A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:
- ``new Set([iterable])`` – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
- ``set.add(value) ``– adds a value, returns the set itself
- ``set.delete(value)`` – removes the value, returns true if value existed
- ``set.has(value) ``– returns true if the value exists in the set, otherwise false.
- ``set.clear() ``– removes everything from the set.
- ``set.size ``– is the elements count.

# WeakSet
A `WeakSet` is used to store a collection of weakly(weak references) held objects
`WeakSet` behaves similarly:
- It is analogous to Set, but we may only add objects to WeakSet (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like Set, it supports add, has and delete, but not size, keys() and no iterations.
```ts
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

john = null;

// visitedSet will be cleaned automatically
```
### Methods available on WeakSet
- `add(value)`
- `delete(value)`
- `has(value)`
```js
var weakSetObject = new WeakSet();
var firstObject = {};
var secondObject = {};
// add(value)
weakSetObject.add(firstObject);
weakSetObject.add(secondObject);
console.log(weakSetObject.has(firstObject)); //true
weakSetObject.delete(secondObject);
```

### Differences between WeakSet and Set
- `Set` can store any value whereas `WeakSet` can store only collections of objects
- `WeakSet` does not have `size` property unlike Set
- `WeakSet` does not have methods such as `clear`, `keys`, `values`, `entries`, `forEach`.
- `WeakSet` is not iterable.

