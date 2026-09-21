## Basic Types
- string: `let name: string = "Alice"`
- number: `let count: number = 42`
- boolean: `let isDone: boolean = true`
- any: `let anything: any = "avoid this when possible"`
- unknown: `let nothing: unknown = "safer than any"`
- void: `let empty: void = undefined`, for functions that return nothing
- never: `let never: never`, for values that never occur (e.g. a function that always throws)
- tuple: `let tuple: [string, number] = ["age", 30]`
```ts
function doSomething(pair: [string, number]) {
  // ...
 
  const c = pair[2];
//Tuple type '[string, number]' of length '2' has no element at index '2'.
}
```
- array: `let list: number[] = [1, 2, 3]`

## Object Types
- Interface (preferred for object shapes, extendabl, interfaces support **declaration merging**)
- Type alias, (they are more flexible — they can represent **unions, intersections, primitives, and tuples**, which interfaces can't.)

### Differences Between Type Aliases and Interfaces
**1. Extending / Composing**
```ts
// Interface: extends
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Type: intersection (&)
type Animal = {
  name: string;
};
type Dog = Animal & {
  breed: string;
};
```
Interfaces use `extends`, types use `&.` Interfaces can also extend a `type`, and a `type` can intersect with an `interface`. But if you're extending multiple things repeatedly, `extends` is generally faster for the compiler to check than large intersections.

**2. Declaration Merging (interfaces only — key difference)**
```ts
interface Window {
  title: string;
}
interface Window {
  size: number;
}
// Merged automatically into:
// interface Window { title: string; size: number; }
```
Type aliases **cannot** do this — declaring `type Window = {...}` twice is a compile error `("Duplicate identifier")`.

**3. Unions, Primitives, Tuples (types only — key difference)**
```ts
type Status = "pending" | "active" | "closed"; // interfaces can't do this
type Id = string | number;
type Coordinates = [number, number];
```
**4.Adding**
```ts
//Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});


// A type cannot be changed after being created
type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

 // Error: Duplicate identifier 'Window'.
 ```

## Union & Intersection Types
- Union: A union `(|)` means **"this could be A or B"**
- Intersection: interfaces allowed us to build up new types from other types by extending them. An intersection `(&)` means "this must satisfy A and B simultaneously"
```ts
type Status = "pending" | "active" | "closed";
type Id = string | number;

//Intersection
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
 
// okay
draw({ color: "blue", radius: 42 });
 
// oops
draw({ color: "red", raidus: 42 });
//Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
// oops
draw({ color: "red" });
//Argument of type '{ color: string; }' is not assignable to parameter of type 'Colorful & Circle'.
//  Property 'radius' is missing in type '{ color: string; }' but required in type 'Circle'.
```

## Generics
`Generics` let you write reusable code that works across multiple types without losing type information.
```ts
function identity<T>(value: T): T {
  return value;
}

interface Box<T> {
  contents: T;
}
```

## Enums
Enums give a name to a fixed set of related constants.They compiles to actual JS objects at runtime(this is often cited as a downside).
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```
## Type Assertions
Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.
```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

## Literal Types
In addition to the general types string and number, we can refer to **specific strings and numbers** in type positions.

```ts
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
//Type '"howdy"' is not assignable to type '"hello"'.
```

## Utility types
Utility types help modify existing types. Examples include:
- Partial<T> – Makes all properties optional.
- Required<T> – Makes all properties required.
- Readonly<T> – Makes all properties read-only.
- Pick<T, K> – Picks specific properties.
- Omit<T, K> – Omits specific properties.




