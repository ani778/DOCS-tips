# Middleware
`Middleware` in Next.js is a functions that run automatically for every incoming request, allowing you to inspect or modify the request data before it reaches your application's routing system.
- Middleware functions are executed before the request reaches the final route handler.
- They can be used to intercept and modify requests and responses.
- Middleware is defined in the middleware.js file at the root of your project.
- Middleware can be used for tasks such as authentication, logging, and request modification.

```js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
```
### Matching Paths
The middleware file will be invoked for every route in your project, If you want to apply 
to any specific route then you have to mention a route matcher inside middleware.js file.

```js
//route matcher (specific path):

export const config = {
    matcher: '/profile/:path*',
} 

//route matcher (multiple path):

export const config = {
    matcher: [ '/profile/:path*',  '/about/:path*' ]
}
```
