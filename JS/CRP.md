# Critical rendering path
The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen.
The critical rendering path includes the Document Object Model (DOM), CSS Object Model (CSSOM), render tree and layout.
The document object model is created as the HTML is parsed. The HTML may request JavaScript, which may, in turn, alter the DOM. The HTML includes or makes requests for styles, which in turn builds the CSS object model. The browser engine combines the two to create the Render Tree. Layout determines the size and location of everything on the page. Once layout is determined, pixels are painted to the screen.
## Understanding CRP
Web performance includes the server requests and responses, loading, scripting, rendering, layout, and the painting of the pixels to the screen.

A request for a web page or app starts with an HTTP request. The server sends a response containing the HTML. The browser then begins parsing the HTML, converting the received bytes to the DOM tree. The browser initiates requests every time it finds links to external resources, be it stylesheets, scripts, or embedded image references.

With the DOM and CSSOM complete, the browser builds the render tree, computing the styles for all the visible content. After the render tree is complete, layout occurs, defining the location and size of all the render tree elements. Once complete, the page is rendered, or 'painted' on the screen.

### Document Object Model
The HTML response turns into tokens which turns into nodes which turn into the DOM Tree. A single DOM node starts with a startTag token and ends with an endTag token.
Nodes contain all relevant information about the HTML element.

### CSS Object Model
The DOM contains all the content of the page. The CSSOM contains all the information on how to style the DOM. 

CSS is render blocking because rules can be overwritten, so the content can't be rendered until the CSSOM is complete.

### Render Tree
the DOM and CSSOM trees are combined into the render tree. the browser checks every node, starting from root of the DOM tree, and determines which CSS rules are attached.

### Layout
Once the render tree is built,Layout is dependent on the size of screen.The layout step determines where and how the elements are positioned on the page, determining the width and height of each element, and where they are in relation to each other.

### Paint
The last step is painting the pixels to the screen. Once the render tree is created and layout occurs, the pixels can be painted to the screen. 