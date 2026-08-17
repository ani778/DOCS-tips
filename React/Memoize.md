# Memoization
Memoization in React is an optimization technique used to improve performance by caching results of computations or components
and reusing them when the same inputs are provided, thereby avoiding unnecessary re-renders or recalculations.

React provides three primary tools for memoization in functional components: `React.memo`, `useMemo`, and `useCallback`. 
1. ***`React.memo` (for Components)***: 

`React.memo` is a higher-order component (HOC) that wraps a functional component to prevent it from re-rendering unless its `props` have changed.
- ***Usage***: Wrap the component definition with React.memo().
- ***Mechanism***: By default, it performs a shallow comparison of the previous and new props using Object.is. If the props are the same, the cached result is reused.
- ***When to use:***
  - For "pure" functional components that render the same output for the same props.
  - For components that are expensive to render or are part of large lists.
```js
import React, { memo } from 'react';

const MyComponent = ({ name, count }) => {
  console.log('MyComponent is rendering...'); // This will only log if props change
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default memo(MyComponent);
```
2. ***`useMemo` (for Values)***: 

The useMemo hook memoizes the result of an expensive calculation or value creation, so it's only recomputed when its dependencies change. 
- ***Usage***: 
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- ***Mechanism***: It takes a function that returns a value and an array of dependencies. It only runs the function to recalculate the value if any dependency in the array has changed since the last render.
- ***When to use:***
  - To avoid expensive calculations (e.g., filtering large lists, complex math) on every render.
3. ***`useCallback` (for Functions)***:

The useCallback hook memoizes an entire function instance
- ***Usage***:
```js
const memoizedCallback = useCallback(() => {
  // function logic
}, [dependencies]);

```
- ***Mechanism***:  It returns a memoized version of the callback function that only changes when one of its dependencies changes.
- ***When to use:***
  -  when passing a callback function as a prop to a memoized child component.This prevents the child component from unnecessarily re-rendering just because the parent created a new function reference during its own render. 
  


