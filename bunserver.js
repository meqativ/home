const server = Bun.serve({
	routes: {
		"/": Bun.file("./index.html"),
		"/script.js": Bun.file("./script.js"),
		"/style.css": Bun.file("./style.css"),
		"/favicon.ico": Bun.file("./assets/favicon.ico"),
		"/modules/*": { dir: "./modules" },
		"/assets/*": { dir: "./assets" },
	},
	fetch: () => new Response(
		`<head><meta name="color-scheme" content="dark light"><meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"><meta name="theme-color" content="#c386ff"></head>` + "meowoops",
		{
			status: 404,
			headers: { "Content-Type": "text/html; charset=utf-8" }
		}
	)
});

console.log(`Server running at ${server.url}`)
