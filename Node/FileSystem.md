# File System
The Node.js FS module allows you to work with the file system on your computer.

Common use for the File System module:
- Read files
- Create files
- Update files
- Delete files
- Rename files

### Read Files
The `fs.readFile()` method is used to read files on your computer.
```ts
const http = require('http');
const fs = require('fs');

const port  = 4000;

const server = http.createServer((req,res) => {
    fs.readFile('page.html', (err,data) => {
        res.writeHeader(200, {'Content-Type': 'text/html'});
        res.write(data);
        
        return res.end()
    })
})

server.listen(port, () => {
    console.log(`Server running 🚀 at http://localhost:${port}/`);
})
```

### Create Files

The File System module has methods for creating new files:
- `fs.appendFile()`
- `fs.writeFile()`
- `fs.open()`

#### fs.appendFile()
The `fs.appendFile()` method appends specified content to a file. If the file does not exist, the file will be created:
```ts
fs.appendFile('mushroomList.txt', 'Champignon', (err) => {
  if (err) throw err;
  console.log('Saved!');
});
```
#### fs.writeFile()
The `fs.writeFile()` method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created.

#### fs.open()
`fs.open()` method does several operations on a file (`fs.readFile()`,`fs.writeFile()`).

The `fs.open()` method takes a "flag" as the second argument, if the flag is w for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
```ts
const fs = require('fs');

fs.open('mushroomList.txt', 'r', (err, f) => {
  console.log('Saved!');
});
```

### Update Files
The File System module has methods for updating files:
- `fs.appendFile()`
- `fs.writeFile()`
#### fs.appendFile()
In previous examples we have created `mushroomList.txt` file with `Champignon` content.
```ts
const fs = require('fs');

fs.appendFile('mushroomList.txt', ', Shiitake', (err) => {
  if (err) throw err;
  console.log('Updated!');
});
```
After running that code the content of `mushroomList.txt` file will be changed to `Champignon, Shiitake`

### Delete Files
To delete a file with the File System module, use the `fs.unlink()` method.
```ts
const fs = require('fs');

fs.unlink('mushroomList.txt', (err) => {
  if (err) throw err;
  console.log('File deleted!');
});
```
### Rename Files
Use `fs.rename()` method for renaming a file.
```ts
const fs = require('fs');

fs.rename('mushroomList.txt', 'fungusList.txt', (err) => {
  if (err) throw err;
  console.log('File Renamed!');
});
```
## The *Sync function
All the functions above have synchronous blocking versions that will wait until 
the operation will be finished. E.g. `readFileSync()` is synchronous and blocks execution until finished.
















