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

	const outcode = compile(parse(tokenize(sanitize(incode))));

	fs.writeFileSync(`${ filepaths[0].split(".", 1)[0] }.html`,
	`
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Game</title>
		<script type="module">

			const canvas = document.getElementById("canvas");
			const ctx = canvas.getContext("2d");
			ctx.font = "20px Arial";

			let focused = false;
			let mousePresent = false;
			let mouseX = 0;
			let mouseY = 0;
			let scroll = 0;
			let keystates = {};

			canvas.addEventListener("keydown", function (event) {
				if (event.code != "Tab" && event.code != "CapsLock") // these are finnicky so we're just gonna ignore them
					keystates[event.code] = true;
			});

			canvas.addEventListener("keyup", function (event) {
				keystates[event.code] = false;
			});

			canvas.addEventListener("mousedown", function (event) {
				if (event.button == 0)
					keystates["Mouse"] = true;
			});

			canvas.addEventListener("mouseup", function (event) {
				if (event.button == 0)
					keystates["Mouse"] = false;
			});

			canvas.addEventListener("mousemove", function (event) {
				mouseX = Math.trunc((event.clientX - canvas.offsetLeft) * 600 / canvas.clientWidth);
				mouseY = Math.trunc((event.clientY - canvas.offsetTop) * 300 / canvas.clientHeight);
			});

			canvas.addEventListener("wheel", function (event) {
				scroll = event.deltaY;
			});

			canvas.addEventListener("mouseenter", (event) => mousePresent = true);
			canvas.addEventListener("mouseleave", (event) => mousePresent = false);

			canvas.addEventListener("focus", (event) => focused = true);
			canvas.addEventListener("blur", (event) => focused = false);

			setInterval(() => {

				ctx.fillStyle = "${ clearColor }";
				ctx.fillRect(0, 0, ${ width }, ${ height });

				${ outcode }

				scroll = 0;

			}, 1000.0 / 60);
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