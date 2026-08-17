# Resolvers in GraphQL
`Resolvers` are a crucial part of GraphQL that determines how data is **fetched and returned in response** to a query. 
They act as the bridge between the client's request and the data source.

Resolvers can return scalar values like **strings or numbers**, as well as complex types like **objects or arrays.**
They can be **synchronous or asynchronous**, allowing for complex data-fetching operations. They can also interact with **3rd party APIs or external databases**.

#### A resolver accepts 4 arguments:
- `Parent`: It represents the data that is returned by the parent's resolver field, if we have nested resolvers present inside the query.
- `Arguments`: These represent the additional arguments that is passed to the query by the user.
- `Context`: It represents a shared object that is present across the resolvers that get called during a single query operation
- `Info`: It represents the data that is present during the query operation, and represents the state of the query

### Resolver Anatomy
We will create a resolver inside a **Query object** and we will name it `getUser`.
Inside the resolver, we write the logic to fetch the data from the **database.**
```
const resolvers = {
  Query: {
    getUser(parent, args, context, info) {
      return {
        &quot;id&quot;: &quot;1&quot;,
        &quot;name: &quot;GFG:
      }
    }
  }
};
```
