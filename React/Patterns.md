# Render Props
The *Render Props pattern* allows you to share logic between components by passing a function as a prop. This function is 
called a “render prop,” and it allows the parent component to control how the child component renders.
```js
import React, { useState } from 'react';

// Component using render props
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };
  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
}
// Component using MouseTracker with render prop
function App() {
  return (
    <MouseTracker
      render={(position) => (
        <p>
          Mouse position: {position.x}, {position.y}
        </p>
      )}
    />
  );
}
export default App;
```
### When to Use Render Props
- Sharing logic while allowing flexibility in rendering.
- Avoiding prop drilling by encapsulating logic in a reusable component.
- Dynamic rendering based on shared logic, like animations or tracking events.

# Compound Components
Compound Components are a design pattern that allows you to create a set of components that work together and share internal state. 
This pattern is often used to create components like tabs, accordions, or dropdowns, where multiple child components depend on each other’s state.
```js
import React, { useState } from 'react';

// Parent component
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { on, toggle })
  );
}
// Child components
function ToggleButton({ on, toggle }) {
  return <button onClick={toggle}>{on ? 'On' : 'Off'}</button>;
}
function ToggleMessage({ on }) {
  return <p>{on ? 'The button is ON' : 'The button is OFF'}</p>;
}
// Using compound components together
function App() {
  return (
    <Toggle>
      <ToggleButton />
      <ToggleMessage />
    </Toggle>
  );
}
export default App;
```
### When to Use Compound Components
- Creating a set of components that work together as a cohesive unit.
- Building flexible UI elements like tabs, accordions, or dropdowns.
- implifying state management for related components.

# Higher-Order Components (HOCs)
A *Higher-Order Component (HOC)* is a function that takes a component and returns a new component.
It’s a pattern used for reusing component logic, such as handling authentication, permissions, or data fetching.
```js
import React, { useEffect, useState } from 'react';

// HOC to fetch data
function withDataFetching(WrappedComponent, url) {
  return function WithDataFetchingComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
        });
    }, [url]);
    return <WrappedComponent data={data} loading={loading} {...props} />;
  };
}
// Component using the HOC
function MyComponent({ data, loading }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
export default withDataFetching(MyComponent, 'https://api.example.com/data');
```
### When to Use HOCs
- Reusing common logic across multiple components.
- Abstracting concerns like authentication, permissions, or data fetching.
- Keeping components focused on their main purpose (UI rendering) while offloading logic to the HOC.