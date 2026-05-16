const fs = require("fs");
const { sanitize } = require("./sanitizer.js");
const { tokenize } = require("./tokenizer.js");
const { parse } = require("./parser.js");
const { compile } = require("./compiler.js");

const filepaths = process.argv.slice(2);

if (filepaths.length == 0) {
	console.error("Format: " + process.argv[0].substring(process.argv[0].lastIndexOf("/") + 1) + " " + process.argv[1].substring(process.argv[1].lastIndexOf("/") + 1) + " yourprogram.code");
	return;
}

try {
	
	const incode = fs.readFileSync(filepaths[0], "utf8");

	// TODO parse out compiler directives
	const width = 600;
	const height = 300;
	const clearColor = "#FFF";
	const scalingAlg = "crisp-edges";

	console.log(tokenize(sanitize(incode))); // TEMP

	const outcode = compile(parse(tokenize(sanitize(incode))));

	fs.writeFileSync(`${ filepaths[0].split(".", 1)[0] }.html`,
	`
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Game</title>
		<script type="module">

			const INTERNAL_canvas = document.getElementById("canvas");
			const INTERNAL_ctx = INTERNAL_canvas.getContext("2d");
			
			INTERNAL_ctx.font = "20px Arial";

			let INTERNAL_focused = false;
			let INTERNAL_mousePresent = false;
			let INTERNAL_mouseX = 0;
			let INTERNAL_mouseY = 0;
			let INTERNAL_scroll = 0;
			let INTERNAL_keystates = {};

			INTERNAL_canvas.addEventListener("keydown", function (event) {
				if (event.code != "Tab" && event.code != "CapsLock") // these are finnicky so we're just gonna ignore them
					INTERNAL_keystates[event.code] = true;
			});

			INTERNAL_canvas.addEventListener("keyup", function (event) {
				INTERNAL_keystates[event.code] = false;
			});

			INTERNAL_canvas.addEventListener("mousedown", function (event) {
				if (event.button == 0)
					INTERNAL_keystates["Mouse"] = true;
			});

			INTERNAL_canvas.addEventListener("mouseup", function (event) {
				if (event.button == 0)
					INTERNAL_keystates["Mouse"] = false;
			});

			INTERNAL_canvas.addEventListener("mousemove", function (event) {
				INTERNAL_mouseX = Math.trunc((event.clientX - INTERNAL_canvas.offsetLeft) * 600 / INTERNAL_canvas.clientWidth);
				INTERNAL_mouseY = Math.trunc((event.clientY - INTERNAL_canvas.offsetTop) * 300 / INTERNAL_canvas.clientHeight);
			});

			INTERNAL_canvas.addEventListener("wheel", function (event) {
				INTERNAL_scroll = event.deltaY;
			});

			INTERNAL_canvas.addEventListener("mouseenter", (event) => INTERNAL_mousePresent = true);
			INTERNAL_canvas.addEventListener("mouseleave", (event) => INTERNAL_mousePresent = false);

			INTERNAL_canvas.addEventListener("focus", (event) => INTERNAL_focused = true);
			INTERNAL_canvas.addEventListener("blur", (event) => INTERNAL_focused = false);

			setInterval(() => {

				INTERNAL_ctx.fillStyle = "${ clearColor }";
				INTERNAL_ctx.fillRect(0, 0, ${ width }, ${ height });

				process();

				INTERNAL_scroll = 0;

			}, 1000.0 / 60);

			${ outcode }
		</script>
	</head>
	<body style="background: black; margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center;">
		<canvas id="canvas" width="${ width }" height="${ height }" tabindex="0" style="height: ${ 100 * height / width }vw; width: 100vw; max-height: 100vh; max-width: ${ 100 * width / height }vh; image-rendering: ${ scalingAlg };"></canvas>
	</body>
	</html>
	`);

} catch (err) {
	console.error(err);
}