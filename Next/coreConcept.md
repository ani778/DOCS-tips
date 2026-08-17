# Key Problems Solved by Next.js

![img.png](../images/img.png)

##  file-based routing
File-based routing is a system where the structure of your application's files and folders directly determines the URL routes.
### Key Principles:
- ***Folders define routes***: Each folder in the `app` directory represents a route segment in the URL.
- ***Special files create UI***: such as `page.js `(or .jsx, .ts, .tsx), are used to define the publicly accessible UI for that route segment.
- ***No configuration needed***

## App Router vs Pages Router
1. ***The Pages Router: The Old Reliable***
- File-based routing: All you need to do is create a .js or .ts file in the pages directory, and Next.js will turn that file into a page.
- Server-side rendering (SSR): If you need to fetch data on the server, you can use getServerSideProps or getStaticProps inside your page files.
2. ***The App Router: The New Kid on the Block***
- Folder-based routing: Routes are defined by folders inside the app directory. 
- Nested layouts: 
- Cleaner data fetching: data fetching is server-side by default
### Comparison

![img.png](../images/img.png)

## Next.js App Router layouts 
`Layouts` are React components that wrap multiple pages, providing shared UI (like headers/footers) that persists across navigation, preventing re-renders and preserving state.

Every app needs a root layout.tsx in the app directory, and you can create nested layouts for specific route segments.
### Key Characteristics
- Shared UI
- Nested Structure
- `children` Prop

## `next/link` vs. `<a>`
`next/link` is a Next.js component for fast, client-side page navigation, avoiding full page reloads like standard `<a>` tags,

![img_1.png](../images/img_1.png)
### Why `next/link` is better
- ***Speed & UX***: Prevents full page refreshes, loading only necessary components, making the app feel faster and more responsive.
- ***Prefetching***: Loads content for linked pages in the background before the user clicks
- ***State Preservation***: Keeps application state (like scroll position or data) intact during navigation.
- ***SEO Friendly***

## Prefetching 
In Next.js, `prefetching` is an automatic performance optimization that pre-loads the resources  for a linked page in the background before the user actually clicks the link
### How It Works
- Automatic Detection: The browser's `Intersection Observer` API is used to detect when a <Link> component enters the user's viewport.
- Background Loading:  Once a link is visible, Next.js injects <link rel="preload"> tags to download the necessary JavaScript chunks and data for that specific route into a client-side cache.
- Prioritization:  The prefetch requests are low-priority and do not interfere with the current page's main resources.
- Instant Navigation: When the user eventually clicks the link, the page's resources are already available locally, allowing for a client-side transition without a full page reload or network delay.
### Key Behaviors and Controls
- Production Only: Prefetching only happens in production builds (npm run build and npm run start), not during development (npm run dev)
- Static vs. Dynamic Routes:
    - For ***static routes***, the full route and its data (e.g., from getStaticProps) are prefetched.
    - For ***dynamic routes***, Next.js generally prefetches only the shared layout and loading states, avoiding unnecessary server work for data that might not be needed.
- Bandwidth Awareness: Next.js automatically disables prefetching on slow network connections or if the user has a "Save-Data" preference enabled in their browser.
- Customization:
    - Disable: using the `prefetch={false}` prop on the `<Link>` component.
    - Manual: For complex scenarios, you can programmatically prefetch routes using the `router.prefetch()` method from the `useRouter` hook. 