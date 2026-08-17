## What is the difference between proto and prototype
The `__proto__` object is the actual object that is used in the lookup chain to resolve methods, etc. Whereas `prototype` is 
the object that is used to build `__proto__` when you create an object with the new operator.
```js
new Employee().__proto__ === Employee.prototype;
new Employee().prototype === undefined;
```
![img.png](../images/img.png)