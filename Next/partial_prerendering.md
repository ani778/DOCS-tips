<strong>Partial Prerendering (PPR)</strong>
 PPR is only available with the Next.js canary releases (next@canary), not in the stable version of Next.js. 
If you call a dynamic function in a route (like querying your database), the entire route becomes dynamic.
 Partial Prerendering – a new rendering model that allows you to combine the benefits of static and dynamic rendering in the same route.

<img width="1012" height="449" alt="image" src="https://github.com/user-attachments/assets/5e9f821d-e864-41df-a5bd-ffc8010f7694" />

When a user visits a route:
  -A static route shell that includes the navbar and product information is served, ensuring a fast initial load.
  -The shell leaves holes where dynamic content like the cart and recommended products will load in asynchronously.
  -The async holes are streamed in parallel, reducing the overall load time of the page.

<p>How does Partial Prerendering work?</p>
Partial Prerendering uses React's Suspense to defer rendering parts of your application until some condition is met (e.g. data is loaded).
The Suspense fallback is embedded into the initial HTML file along with the static content. At build time (or during revalidation), the static content is <p>prerendered</p> to create a static shell. The rendering of dynamic content is <p>postponed</p> until the user requests the route.
Suspense is used as a boundary between your static and dynamic code.
As long as you're using Suspense to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.
