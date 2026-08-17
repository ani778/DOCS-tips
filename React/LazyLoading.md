# Lazy loading

***React.lazy and Suspense are designed for client-side rendering (CSR).***

Lazy loading in React is a technique to optimize performance by deferring the loading of non-critical components or resources 
until they are needed, which reduces the initial bundle size and improves initial page load times. 
## Core Concepts
- `React.lazy()`:  A function that lets you render a dynamic import() as a regular component. The component's code is automatically loaded when it is first rendered
- `<Suspense>`: . It takes a `fallback` prop, which accepts any React elements (e.g., a loading spinner or placeholder UI) to display while the component is being downloaded.
```js
import React, { Suspense, lazy } from 'react';
import Loader from './Loader'; // A loading indicator component

// 1. Convert the static import to a lazy import
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      {/* 2. Wrap the lazy component with Suspense and provide a fallback */}
      <Suspense fallback={<Loader />}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

```

##  Use Cases
- ***Route-Based Lazy Loading:***  you only load the code for the specific page the user is visiting.
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ... other imports
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading Page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

```
- ***Component-Based Lazy Loading***: Useful for large, non-critical components on a single page( rich text editor, or a modal that is only displayed after a user interaction).
- ***Asset Lazy Loading***: While React handles component code, you can lazy load images and other media using the native HTML attribute `<img src="..." loading="lazy" />`.