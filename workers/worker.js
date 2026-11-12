/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = "hinthar-resources.netlify.app";

    // Clone headers and set Host header to Netlify's hostname
    const headers = new Headers(request.headers);
    headers.set("Host", "hinthar-resources.netlify.app");
    headers.set("X-Forwarded-Host", "hinthar.education");

    const response = await fetch(url.toString(), {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: "manual"
    });

    const responseHeaders = new Headers(response.headers);
    const location = responseHeaders.get("location");

    if (location) {
      try {
        const redirectURL = new URL(location, "https://hinthar.education");
        if (
          redirectURL.hostname === "hinthar-resources.netlify.app" ||
          redirectURL.hostname === "hinthar.education"
        ) {
          redirectURL.hostname = "hinthar.education";
          responseHeaders.set("location", redirectURL.toString());
        }
      } catch {
        // Leave unparseable locations untouched
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  }
};