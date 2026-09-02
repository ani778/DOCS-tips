# React Query
React Query (now called TanStack Query) is a data-fetching and state management library for React that handles server state — fetching, caching, syncing, and updating data from an API.

**Core idea:** instead of manually managing loading/error/data state with `useEffect` + `useState`, you describe what data you need and React Query handles the how — caching, deduping requests, background refetching, retries,
```js
import { useQuery } from '@tanstack/react-query'

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  )
}
```
#### Key features
- **Caching** — results are cached by `queryKey` and reused across components
- **Automatic refetching** — on window focus, network reconnect, interval
- **Mutations** — `useMutation` for POST/PUT/DELETE with optimistic updates
- **Pagination & infinite queries** — `useInfiniteQuery`
- **Devtools** — a browser extension/panel to inspect the cach

  After the library is installed in our application, create a **provider** and **client** to use React Query. You can create it in the index.tsxfile.
  ```js
  import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);```
After that, you can immediately use React Query Hooks.
```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';

function App() {
  const userData = useQuery(
    ['users'], 
    () => {
      return fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
    },
    {
      enabled: false,
    }
  );
return (
    <div>
      ...
    </div>
  );
}

export default App;
```

We also have `useMutation` where these hooks are almost the same as `useQuery`, but are **used to mutate data.**
```js
  const mutatePost = useMutation(
    ['posts'],
    (newPost: any) => {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    }
  )
```
## Difference between useQuery and useMutation
- **Purpose**: `useQuery` is for reading data, while `useMutation` is for modifying data.
- **Typical Use Case**: `useQuery` is used when you want to fetch and display data, while `useMutation` is used when you want to make changes to that data.
- **Return Values**: `useQuery` returns { data, error, isLoading, isFetching }, while `useMutation` returns { mutate, data, error, isError, isLoading, isSuccess }.
- **Error Handling**: Both hooks handle errors, but `useMutation` provides additional features for handling optimistic updates and rollbacks in case of errors during mutations.
