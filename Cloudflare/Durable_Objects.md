
# Durable Objects
A `Durable Object` is a special kind of **Cloudflare Worker** which uniquely combines compute with storage.

Unlike regular Workers:
- Each `Durable Object` has a **globally-unique name**, which allows you to send requests to a specific object from anywhere in the world. Thus, a Durable Object can be used to coordinate between multiple clients who need to work together.
- Each `Durable Object` has some **durable storage** attached. Since this storage lives together with the object, it is strongly consistent yet fast to access

#### Durable Objects enable **stateful** serverless applications.

Durable Object has one active instance at any particular time. All requests sent to that Durable Object are handled by that same instance. You can store some state in memory.

A given instance of a Durable Object may share global memory with other instances defined in the same Worker code.
```js
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.ctx.blockConcurrencyWhile(async () => {
      let stored = await this.ctx.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // use this.value rather than storage
  }
}
```

### Access storage
Durable Objects gain access to Storage API via the `DurableObjectStorage interface` and accessed by the `DurableObjectState::storage` property. This is frequently accessed via `this.ctx.storage` with the `ctx` parameter passed to the Durable Object constructor.
```ts
export class Counter extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

    async increment(): Promise<number> {
      let value: number = (await this.ctx.storage.get('value')) || 0;
      value += 1;
      await this.ctx.storage.put('value', value);
      return value;
    }

}
```

### SQL API
The `SqlStorage` interface encapsulates methods that modify the SQLite database embedded within a Durable Object. The `SqlStorage` interface is accessible via the sql property of **DurableObjectStorage** class.
`sql.exec()` a user can create a table and insert rows.
```ts
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
  sql: SqlStorage;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;

    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS artist(
        artistid    INTEGER PRIMARY KEY,
        artistname  TEXT
      );
      INSERT INTO artist (artistid, artistname) VALUES
        (123, 'Alice'),
        (456, 'Bob'),
        (789, 'Charlie');
    `);
  }
}
```






