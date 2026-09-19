/**
 * Practice A/B testing Worker
 * Pattern: cookie-based sticky variant assignment + HTML rewriting
 *
 * How it works:
 * 1. Check for an existing "ab_variant" cookie
 * 2. If none exists, randomly assign the visitor to "a" or "b" and set the cookie
 * 3. Fetch the origin response, then rewrite the HTML based on the assigned variant
 * 4. Return the modified response WITH the cookie set
 *
 * IMPORTANT (this is the part interviewers care about):
 * Because the response differs per visitor (based on a cookie), Cloudflare's
 * default cache must NOT serve this page from a shared cache — otherwise
 * whichever variant gets cached first gets served to everyone. In production
 * you'd pair this Worker with a Cache Rule that bypasses/varies cache by the
 * "ab_variant" cookie. This Worker sets `Cache-Control: private, no-store`
 * as a basic safeguard, but the *correct* fix is a Cache Rule — see notes
 * at the bottom of this file.
 */

const COOKIE_NAME = "ab_variant";
const SPLIT_RATIO = 0.5; // 0.5 = 50/50 split. Try changing to 0.7 for a 70/30 split.

export default {
  async fetch(request, env, ctx) {
    // console.log("request", request);
    const cookie = getCookie(request, COOKIE_NAME);
    let variant = cookie;
    let isNewAssignment = false;
console.log("cookie", cookie);
    if (variant !== "a" && variant !== "b") {
      variant = Math.random() < SPLIT_RATIO ? "a" : "b";
      isNewAssignment = true;
    }

    // Optional: allow direct override for QA/testing via query param,
    // e.g. https://your-worker.workers.dev/?force_variant=b
    const url = new URL(request.url);
    const forced = url.searchParams.get("force_variant");
    console.log("forced", forced);
    if (forced === "a" || forced === "b") {
      variant = forced;
    }

    // Fetch the original response from the origin (or serve inline HTML for this demo)
    const originResponse = await getOriginResponse(request);

    // Rewrite the HTML based on the assigned variant
    const rewritten = new HTMLRewriter()
      .on("#hero-heading", new HeadingRewriter(variant))
      .on("body", new VariantBadgeInjector(variant))
      .transform(originResponse);

    const response = new Response(rewritten.body, rewritten);

    // Cache safety: don't let a shared/edge cache serve this personalized response
    // to other visitors. In production, prefer a Cache Rule that varies/bypasses
    // cache by the ab_variant cookie instead of relying only on this header.
    response.headers.set("Cache-Control", "private, no-store");

    // Set the sticky cookie so this visitor gets the same variant next time
    if (isNewAssignment || forced) {
      response.headers.append(
        "Set-Cookie",
        `${COOKIE_NAME}=${variant}; Path=/; Max-Age=2592000; Secure; HttpOnly; SameSite=Lax`
      );
    }

    // Log the exposure event without delaying the response to the user.
    // In a real setup this might POST to an analytics endpoint or SiteSpec's API.
    ctx.waitUntil(logExposure(variant, request));

    return response;
  },
};

// --- Helpers ---

function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

async function getOriginResponse(request) {
  // For this practice exercise, we serve a small inline HTML page instead of
  // proxying to a real origin. In production, this would be:
  //   return fetch(request);
  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>A/B Test Demo</title></head>
      <body>
        <h1 id="hero-heading">Default headline</h1>
        <p>This page demonstrates edge-based A/B testing with a Cloudflare Worker.</p>
      </body>
    </html>
  `;
  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

async function logExposure(variant, request) {
  // Placeholder — in a real integration this might call SiteSpec's tracking
  // endpoint, write to Workers KV/Analytics Engine, or push to a Queue.
  console.log(`Exposure logged: variant=${variant}, url=${request.url}`);
}

// --- HTMLRewriter handlers ---

class HeadingRewriter {
  constructor(variant) {
    this.variant = variant;
  }
  element(element) {
    if (this.variant === "b") {
      element.setInnerContent("New and improved headline (Variant B)");
    }
    // Variant "a" keeps the default content untouched
  }
}

class VariantBadgeInjector {
  constructor(variant) {
    this.variant = variant;
  }
  element(element) {
    element.append(
      `<div style="position:fixed;bottom:8px;right:8px;background:#000;color:#fff;padding:4px 8px;font-family:sans-serif;font-size:12px;">Variant: ${this.variant.toUpperCase()}</div>`,
      { html: true }
    );
  }
}

/**
 * NEXT STEPS TO PRACTICE:
 *
 * 1. Deploy this with `wrangler deploy` and hit it with curl -I to inspect
 *    Set-Cookie and Cache-Control headers.
 * 2. Hit it again WITH the cookie attached (curl -I -H "Cookie: ab_variant=b ...")
 *    and confirm you always get variant B back.
 * 3. Try the ?force_variant=a and ?force_variant=b query params.
 * 4. In the Cloudflare dashboard, create a Cache Rule that bypasses cache when
 *    the "ab_variant" cookie is present, and explain out loud why this Worker's
 *    Cache-Control header alone isn't sufficient in a multi-layer caching setup
 *    (e.g. if a Cache Rule elsewhere forces caching regardless of headers).
 * 5. Change SPLIT_RATIO to 0.7 and verify the distribution over ~20 fresh
 *    requests (clear cookies between requests, or use curl without -c/-b).
 */