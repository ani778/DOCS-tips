# Buffer
`Buffer` is a special type of object that can store raw binary data. A buffer represents a chunk of memory

A buffer stores bytes. A byte is a sequence of eight bits. Bits are the most basic unit of storage on your computer, they can hold the value of either 0 or 1.

#### Buffer methods:
- `Buffer.alloc(size)` - It creates a buffer and allocates size to it.
- `Buffer.from(initialization)`- It initializes the buffer with given data.
- `toString()`- It reads data from the buffer and returned it.
- `Buffer.write(data)`- It writes the data to the buffer.
- `Buffer.slice(start, end=buffer.length)`- It returns the subsection of data stored in a buffer.
- `Buffer.concat([buffer,buffer])`- It concatenates two buffers.
- `Buffer.isBuffer(object)`- It checks whether the object is a buffer or not.
- `Buffer.length`- It returns the length of the buffer.
- `Buffer.copy(buffer,subsection size)`- It copies data from one buffer to another.
- `Buffer.compare()`-The Buffer.compare() method enables you to compare two buffer objects to check whether they are equal.
- ` Buffer.fill()` - method enables you to create a buffer, allocate a size, and fill it with a specified value.
```ts
const buff = Buffer.alloc(10).fill('a');

console.log(buff.toString());
// This will print aaaaaaaaaa
```
- `buff.includes()`-you want to determine whether a buffer object contains any values
- ``

### Creating a buffer
`Buffer.from()` accepts a string, an array, an ArrayBuffer, or another buffer instance. Depending on which params you pass,
Buffer.from() will create a buffer in a slightly different way.

The `Buffer.alloc() `method is useful when you want to create empty buffers, without necessarily filling them with data. By default,
it accepts a number and returns a buffer of that given size filled with 0s:
```ts
Buffer.alloc(6); // --> <Buffer 00 00 00 00 00 00>
```

### Reading a buffer
Once you created a buffer, you can read it using `toString()` method:
```ts
const buffer = Buffer.from("chihuahua");

console.log(buffer.toString()); // chihuahua
```

### Writing to buffer
The way to write data into buffers is using `Buffer.write().` By default, it will write a string encoded in utf-8 with no offset. 
It returns a number, which is the number of bytes that were written in the buffer:
```ts
const buffer = Buffer.alloc(9);

buffer.write("chihuahua"); // returns 9 (number of bytes written)
//If you write more bytes than the buffer supports, your data will be truncated to fit the buffer:
buffer.write("hey chihuahua"); // returns 9 (number of bytes written)

console.log(buffer.toString()); // 'hey chihu'
```

### Slicing and concatenating buffers
`Buffer.slice()` I is generally the same as that of Array.prototype.slice, but with one very important difference:
the slice is not a new buffer and merely references a subset of the memory space.

`Buffer.concat()` works the same as in arrays.
```ts
// Slicing a buffer
const buffer1 = Buffer.from('Pugs are cute');
const buffer2 = buffer1.slice(0, 4);
console.log(buffer2.toString()); // Pugs
 
// Concatenating two buffers
const buffer3 = Buffer.from(' are funny');
const buffer4 = Buffer.concat([buffer2, buffer3]);
console.log(buffer4.toString()); // Pugs are funny
```
### Copying a buffer
`Buffer.copy()` allows one to copy the contents from one buffer to another.
```ts
const buffer1 = Buffer.alloc(50)
const buffer2 = Buffer.from("inside the 🍔", "utf-8")

buffer1.write("Try to put 🍟 in every meal", "utf-8");
buffer2.copy(buffer1, 16)

console.log(buffer1.toString("utf-8")) // Try to put 🍟 inside the 🍔
```