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

    const response = await fetch(new Request(url, request), {
      redirect: "manual"
    });

    const headers = new Headers(response.headers);
    const location = headers.get("location");

    if (location) {
      try {
        const redirectURL = new URL(location);
        if (redirectURL.hostname === "hinthar-resources.netlify.app") {
          redirectURL.hostname = "hinthar.education";
          headers.set("location", redirectURL.toString());
        }
      } catch {
        // Leave relative redirects untouched
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};