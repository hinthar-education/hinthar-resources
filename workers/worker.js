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

		const res = await fetch(new Request(url, request));

		const location = res.headers.get("location");
		if (location?.includes("hinthar-resources.netlify.app")) {
			const headers = new Headers(res.headers);
			headers.set(
				"location",
				location.replace("hinthar-resources.netlify.app", "hinthar.education")
			);
			return new Response(res.body, { status: res.status, headers });
		}
		return res;
	}
};