# Virtual DOM
Virtual DOM is a “virtual” representation of a UI which is kept in memory and synced with the “real” DOM by a library such as ReactDOM.
This process is called `reconciliation.`  <b>Reconciliation</b> is the process through which React updates the Browser DOM.

Important concepts behind the working of the Reconciliation process are:
- Virtual DOM
- Diffing Algorithm

React renders JSX components to the Browser DOM, but keeps a copy of the actual DOM to itself. The following actions take place in React:

- React stores a copy of Browser DOM which is called Virtual DOM.
- When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one
- Comparison is done by Diffing Algorithm. Note: These comparisons take place in the memory and nothing is yet changed in the Browser
- After comparing, React goes ahead and creates a new Virtual DOM having the changes
- Then it updates the Browser DOM with the least number of changes possible without rendering the entire DOM again

### How does this Virtual DOM compare itself to its previous version?
This is where the **Diffing Algorithm** comes into play. When diffing two trees, React first compares the two root elements.
The behavior is different depending on the types of the root elements. Some concepts used by this Algorithm are:
- Two elements of different types will produce different trees.
- **Breadth-First Search (BFS)** is applied because if a node is found as changed, it will re-render the entire subtree hence Depth First Approach is not exactly optimal.
- When comparing two elements of the same type, keep the underlying node as same and only update changes in attributes or styles.
- React uses optimizations so that a minimal difference can be calculated in O(N) efficiently using this Algorithm

### Depth-first
With DFS of non-tree graphs, just like with trees, we follow a single line of child nodes until we hit a childless node. (go depth until find latest child) When we traverse down a path of children, we add them to the stack as we go along. Once we reach a node with no accessible children, we follow our path backwards until we find a node that has another path extending off of it
### Breadth-first
In breadth-first searches, we go broad first. This means that after we examine our first node, we examine all of its immediately neighboring nodes before we go any deeper.

# React Fiber
**React Fiber** is the **reconciliation algorithm** introduced in React 16. It is a complete rewrite of React’s rendering core, making rendering more efficient and allowing React to handle complex UI updates more smoothly.

### Key Features of React Fiber:
1. **Incremental Rendering (Time-Slicing)** — Helps prioritize rendering work, making UI updates feel smoother.
2. **Concurrency Mode** — Allows React to pause and resume rendering work, improving responsiveness.
3. **Better Error Handling** — Provides improved error boundaries for catching and handling errors gracefully.
4. **Fragmentation Support** — Introduced support for React Fragments (<>...</>) to return multiple elements without extra divs.
5. **Suspense & Lazy Loading** — Helps with async rendering and code-splitting for better performance.
6. **Prioritization & Scheduling** — React Fiber assigns different priority levels to updates, optimizing the rendering process.

### Why is React Fiber important?
React Fiber makes UI rendering more **efficient and flexible**, allowing React applications to:
- Handle large updates without blocking the main thread.
- Provide a smoother user experience in complex applications.
- Improve responsiveness with concurrent rendering.


-----------------------------------


# Reconciliation 
Reconciliation is the process React uses to update the browser's actual DOM to match the latest UI described by your components' state and props.
This is achieved by comparing the current virtual DOM (VDOM) with a new VDOM representation and applying only the necessary changes to the real DOM, minimizing costly direct DOM manipulations.
The modern implementation of this process is called ***React Fiber.*** 
### The Reconciliation Process (two main Render and Commit Phases)
1. ***Render Phase (Diffing)***
- New VDOM Tree
- Comparison (Diffing Algorithm)
- Identify Changes
2. ***Commit Phase:***
- Apply to Real DOM
- UI Update







