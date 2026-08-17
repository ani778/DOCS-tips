# GraphQL Type System
GraphQL is a **strongly typed language**, which means **every piece of data in a GraphQL service has a specific type.**

## 1. Scalar Types
These types are **primitive data types**. These data types tend to store only a single value.
- `Int`: Signed 32-bit Integer.
- `Float`: Signed number with values in integer and decimal form.
- `String`: UTF - 8-character sequence.
- `Boolean`: True or false.
- `ID`: It is a unique identifier

You can use these directly in the schema you pass to `buildSchema`.

Use an exclamation point to indicate a type cannot be nullable (`String! `).

To use a list type, surround the type in square brackets, so `[Int]` is a list of integers.
```js
import { buildSchema } from 'graphql';
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const schema2 = buildSchema(`
type Post {
    id: ID!
        title: String!
        content: String!
        createdAt: DateTime!
}
`)
```

## 2. Object Types
It allow users to represent a **group of fields as a whole.**
It also supports the nested type features in this data type.
```
type Person {
  id: ID!
  name: String!
  age: Int!
  address: Address!
}

type Employee {  
   emp_id:ID  
   firstname: String  
   age: Int  
   salary:Float  
} 
--To define a GraphQL schema--
type Query  
{  
       emp_details:[Employee]  
} 
```

## 3. Query Type

## 4. Mutation Type
The Mutation Type is among the top root-level types in GraphQL.

It is used to specify the entry point to perform the data mainpulations operations. 
It performs operations like `create`, `update` or `delete` data.
```
input MessageInput {
  content: String
  author: String
}
 
type Message {
  id: ID!
  content: String
  author: String
}
 
type Query {
  getMessage(id: ID!): Message
}
 
type Mutation {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
```



## 5. List Type
It is generally used to represent an **array of values of a particular type**.
```
Example:
type Query {  
   todo: [String]  
} 
```


## 6. Abstract types
GraphQL includes two kinds of abstract types: `interfaces` and `unions`. These types let a single field return values
of different object types, while keeping your schema type-safe.
### Defining `interfaces`
To define an interface in GraphQL.js, use the `GraphQLInterfaceType` constructor. An interface must include a `name`,
definition of the shared `fields`, and should include a `resolveType` function telling GraphQL which concrete type a given value corresponds to.
```js
import { GraphQLInterfaceType, GraphQLString, GraphQLNonNull } from 'graphql';
 
const ContentItemInterface = new GraphQLInterfaceType({
  name: 'ContentItem',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    publishedAt: { type: GraphQLString },
  },
  resolveType(value) {
    if (value.audioUrl) {
      return 'PodcastEpisode';
    }
    if (value.bodyText) {
      return 'Article';
    }
    return null;
  },
});
 
exports.ContentItemInterface = ContentItemInterface;
```
### Implementing interfaces with object types
To implement an interface, define a `GraphQLObjectType` and include the interface in its `interfaces` array. 
The object type must implement all fields defined by the interface.
```js
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ContentItemInterface } from './ContentItemInterface.js';
 
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  interfaces: [ContentItemInterface],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    publishedAt: { type: GraphQLString },
    bodyText: { type: GraphQLString },
  },
  isTypeOf: (value) => value.bodyText !== undefined,
});
 
const PodcastEpisodeType = new GraphQLObjectType({
  name: 'PodcastEpisode',
  interfaces: [ContentItemInterface],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    publishedAt: { type: GraphQLString },
    audioUrl: { type: GraphQLString },
  },
  isTypeOf: (value) => value.audioUrl !== undefined,
});
```
### Defining `union` types
Use the `GraphQLUnionType` constructor to define a union.
A union requires a `name` and a list of object `types` (types). 
It should also be provided a `resolveType` function the same as explained for interfaces above.
```js
import { GraphQLUnionType } from 'graphql';
 
const SearchResultType = new GraphQLUnionType({
  name: 'SearchResult',
  types: [BookType, AuthorType, PublisherType],
  resolveType(value) {
    if (value.isbn) {
      return 'Book';
    }
    if (value.bio) {
      return 'Author';
    }
    if (value.catalogSize) {
      return 'Publisher';
    }
    return null;
  },
});
```









## Passing Arguments
By defining the arguments in the schema language, typechecking happens automatically. Each argument must be named and have a type.
```
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}

const root = {
  rollDice({ numDice, numSides }) {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
};
```
