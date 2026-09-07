1. **React Compiler (automatic memoization)**  
You no longer need to manually write `useMemo` and `useCallback `. A dedicated compiler (formerly React Forget) analyzes your code at build time and automatically memoizes components and hooks. This solves the problem of unnecessary rerenders out of the box.

2. **New hook `use()`**
The hook `use()` blurs the boundaries of asynchrony in React. 
Its main feature is that it **can be called within conditions ( if) and loops ( for)** , unlike standard hooks.

 `use()` hook replaces multiple hooks, such as `useEffect` for data fetching as well as `useContext` and `useState` for consuming context data.  
  ```js
     import React, { use } from 'react';

// Function to fetch data
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const DataFetchingComponent = () => {
  // `use()` suspends the component until the promise resolves
  const data = use(fetchData());

  return (
...
  );
};
```
   **it is currently only supported in Server Components**
                                                                               
3. **Server Components (RSC) and Server Actions**
                                                                               
RSC offers a new approach by allowing components to be partially rendered on the server and then hydrated on the client. This leads to faster load times and better SEO.

Server actions enable developers to offload specific logic to the server without leaving the React ecosystem. This is especially beneficial for operations like data fetching, authentication, or complex processing tasks that might affect the client’s performance.

4. **Improved work with forms (Actions API)**
 - `useActionState`: new Hook introduced in React 19 for handling form action state updates. It allows you to update component state based on form action results.
  ```js
   const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
  ```                                                                             
Return values include current state `(state)`, form action `(formAction)`, and a boolean `(isPending)` indicating pending status.

- `useFormStatus`: useFormStatus is a Hook specifically for obtaining parent form submission status. It provides detailed status information during form submission.
```js
   const { pending, data, method, action } = useFormStatus();  

   import React, { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
function Form() {
  async function formAction(formData) {
    // Handle form submission
  }
  
  return (
    <form action={formAction}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}                                                                            
```
Must be used inside <form> elements and as direct children of forms—not within form action handler functions

- `useOptimistic`: The useOptimistic hook is designed to help developers create snappy and responsive user interfaces by showing expected outcomes before async actions complete. It's synchronous
```js
const [optimisticState, addOptimistic] = useOptimistic(state);

const handleClick = () => {
  addOptimistic(prev => [...prev, newItem]);
};
```
5. **Metadata Management**
Tags  `<title>`can `<meta>`now `<link>`be declared directly within components. React will automatically move them to `<head>`the document.

6. **`ref` as a Prop**
  Now `ref` passed as a regular prop to functional components.This enhancement makes it easier to handle scenarios like focus management, animations, or third-party library integrations.
```js
import { useRef } from 'react';

function FancyInput({ ref }: { ref: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} />;
}

export default function RefExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </div>
  );
}
```














                                                                               








                                                                               

export default DataFetchingComponent;                                                                          
