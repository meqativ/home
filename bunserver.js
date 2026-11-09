const CURSES = {
	"Access-Control-Allow-Origin": "https://meqativ.github.io",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
}

const server = Bun.serve({
	fetch(req) {
		if (req.method === "OPTIONS") {
			return new Response(null, { headers: CURSES })
		}

		const url = new URL(req.url)
		let file

		if (url.pathname === "/") {
			file = Bun.file("./index.html")
		} else if (url.pathname === "/script.js") {
			file = Bun.file("./script.js")
		} else if (url.pathname === "/style.css") {
			file = Bun.file("./style.css")
		} else if (url.pathname === "/favicon.ico") {
			file = Bun.file("./assets/favicon.ico")
		} else if (url.pathname.startsWith("/modules/")) {
			file = Bun.file("." + url.pathname)
		} else if (url.pathname.startsWith("/assets/")) {
			file = Bun.file("." + url.pathname)
		}

		if (file) {
			return new Response(file, {
				headers: CURSES
			})
		}

		return new Response(
			`<head><meta name="color-scheme" content="dark light"><meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"><meta name="theme-color" content="#c386ff"></head>` + "meowoops",
			{
				status: 404,
				headers: {
					"Content-Type": "text/html; charset=utf-8",
					...CURSES,
				}
			}
		)
	}
});

console.log(`Server running at ${server.url}`)