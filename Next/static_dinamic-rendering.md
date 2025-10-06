<b>What is Static Rendering?</b>
With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when revalidating data.
Whenever a user visits your application, the cached result is served.
Benefits:
  -Faster Websites - Prerendered content can be cached and globally distributed when deployed to platforms like Vercel. This ensures that users around the world can access your website's content more quickly and reliably.
  -Reduced Server Load - Because the content is cached, your server does not have to dynamically generate content for each user request. This can reduce compute costs.
  -SEO 
Static rendering is useful for UI with no data or data that is shared across users, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data which is regularly updated

<b>What is Dynamic Rendering?</b>
With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page). 
Benefits:
  -Real-Time Data - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
  -User-Specific Content - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
  -Request Time Information - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.
