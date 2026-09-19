# Cache Rules
Use `Cache Rules` to customize cache settings on Cloudflare. `Cache Rules` allows you to make adjustments to what is eligible to cache, how long it should be cached and where, as well as trigger specific interactions with Cloudflare's cache and other Rules products for matching requests.

Cache Rules can be created in the dashboard, via API or Terraform.

### Cache Rules and cache keys
When a **Cache Rule** sets a `custom cache key`, the resulting cache entry is indexed by that key .
 Depending on what the custom cache key includes, this may affect single-file purge:
- Custom cache keys that only change how the query string is handled
- Custom cache keys that include headers, cookies, or other request properties will prevent dashboard single-file purge from working, because the dashboard cannot send those values in a purge request.
- Even without Cache Rules, Cloudflare's default cache key includes certain request headers. 



## Append dates to cookies to use with A/B testing
Dynamically set a cookie expiration and test group.
```js
export default {
	async fetch(request) {
		const response = await fetch(request);

		// Clone the response so that it is no longer immutable
		const newResponse = new Response(response.body, response);

		// Define the dynamic expiry time. 24 h * 60 m * 60 s * 1000 ms = 86,400,000 ms
		const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();
		// Define the group variable. "A" if the request header "userGroup" is "premium", "B" if otherwise.
		const group = request.headers.get("userGroup") == "premium" ? "A" : "B";

		// Append the custom header with the values
		newResponse.headers.append(
			"Set-Cookie",
			`testGroup=${group}; Expires=${expiry}; Path=/`,
		);

		return newResponse;
	},
};
```

## A/B testing with same-URL direct access
Set up an **A/B test** by controlling what response is served based on cookies.
```js
const NAME = "myExampleABTest";

export default {
	async fetch(request) {
		// Clone the original URL
		const url = new URL(request.url);

		// Enable Passthrough to allow direct access to control and test routes.
		if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
			return fetch(request);

		// Determine which group this requester is in.
		const cookie = request.headers.get("cookie");

		if (cookie && cookie.includes(`${NAME}=control`)) {
			url.pathname = "/control" + url.pathname;
		} else if (cookie && cookie.includes(`${NAME}=test`)) {
			url.pathname = "/test" + url.pathname;
		} else {
			// If there is no cookie, this is a new client. Choose a group and set the cookie.
			const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
			if (group === "control") {
				url.pathname = "/control" + url.pathname;
			} else {
				url.pathname = "/test" + url.pathname;
			}
			// Reconstruct response to avoid immutability
			let response = await fetch(url);
			response = new Response(response.body, response);
			// Set cookie to enable persistent A/B sessions.
			response.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
			return response;
		}
		return fetch(url);
	},
};
```