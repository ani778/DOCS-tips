# Hooks
## `useState`
The `useState` hook allows you to add stateful behavior to functional components.
The hook ***returns*** an array containing the current state value and a function to update that state value. Here's the basic syntax:
```ts
const [stateValue, setStateValue] = useState(initialState);
```
Remember that `useState` should be used only inside functional components or custom hooks.

## `useEffect`
It takes two arguments:
- A function that contains the side effect (fetch data from an API when the `component mounts`)
- An optional array of dependencies, which controls when the useEffect function should be re-run.
    - If the dependencies array is empty ([]), the useEffect function will run only once, after the initial render.
    - If you pass one or more variables in the dependencies array, the useEffect function will run whenever any of those variables change.
```ts
function MyComponent() {
  useEffect(() => {
    // Fetch data from an API
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
      });
  }, []);
}
```

## `useReducer`
The `useReducer` hook follows the concept of a "reducer function," 
which is a pure function that takes the current state and an action as input and returns a new state based on that action.
```ts
const [state, dispatch] = useReducer(reducer, initialState)
```
1. `reducer`: It takes two arguments: the state and an action. It returns a new state based on the action.
2. `initialState`: The initial state represents the initial value of the state before any actions are dispatched.
3. `state`: The current state, which is managed by the useReducer hook.
4. `dispatch`: The dispatch function is used to trigger state transitions. It takes an action as an argument and sends it to the reducer function. The reducer processes the action and returns a new state.
```js
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};
const Counter = () => {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};
```

## `useMemo`
The `useMemo` hook is used to memoize expensive computations so that they are only re-computed when their dependencies change. 
It returns a memoized value, which prevents unnecessary re-rendering of components when the result is the same as the previous render.
```js
import React, { useMemo } from 'react';

const ExpensiveComponent = ({ data }) => {
  const result = useMemo(() => {
    // Expensive computation based on 'data'
    return data * 2;
  }, [data]);

  return <p>Result: {result}</p>;
};
```

## `useCallback`
The `useCallback` hook is used to memoize callback functions to prevent unnecessary re-creation of functions on every render. 
It's especially useful when passing callbacks to child components, as it ensures that child components don't re-render unnecessarily.
```js
const Counter = ({ onIncrement }) => {
  // Wrapping the callback with useCallback
  const handleIncrement = useCallback(() => {
    onIncrement();
  }, [onIncrement]);
return <button onClick={handleIncrement}>Increment</button>;
};
```

## `useRef `
The `useRef` hook is used to create a mutable reference that persists across renders.
It can be used to hold references to DOM elements or to store any mutable value that doesn't trigger a re-render when it changes.
```ts
import React, { useRef, useEffect } from 'react';

const FocusableInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};
```

## `useContext`
The `useContext` hook in React allows functional components to read and subscribe to context values from a parent component
without the need to pass props down manually at every level (known as prop drilling).
#### How to use `useContext`
1. ***Create a Context***

First, you create a context object using the createContext function from React. This object comes with a Provider and a Consumer.
```js
// ThemeContext.js
import React, { createContext } from 'react';

const ThemeContext = createContext('light'); // 'light' is the default value

export default ThemeContext;
```
2. ***Provide the Context***

Next, you wrap the components that need access to the context with the Context.Provider component. Pass the data you want to share to the value prop. 
```js
// App.js
import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import ThemedComponent from './ThemedComponent';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <h1>Current Theme: {theme}</h1>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

export default App;
```
3. ***Consume the Context***

Use the useContext hook to access the current context value. 
```js
// ThemedComponent.js
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function ThemedComponent() {
  const theme = useContext(ThemeContext); // Access the value 'dark' from the provider

  return (
    <p>The current theme from context is: {theme}</p>
  );
}

export default ThemedComponent;

```
### Key Benefits
- Avoids Prop Drilling
- Centralized State Management
- Automatic Re-renders