# React Router
React Router is a library that provides routing capabilities for React applications.
It enables you to:
- Create multiple pages in your single-page application
- Handle URL parameters and query strings
- Manage browser history and navigation
- Create nested routes and layouts
- Create nested routes and layouts

  Your application must be wrapped with the BrowserRouter component to enable routing:
```js
function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```
### Basic Routing
React Router uses three main components for basic routing:
- `Link`: Creates navigation links that update the URL
- `Routes`: A container for all your route definitions
- `Route`: Defines a mapping between a URL path and a component

There is a special version of the `Link` component called `NavLink` that knows whether the link's URL is "active" or not.
The `NavLink` is especially useful for:
- Navigation menus
- Breadcrumbs
- Tabs



