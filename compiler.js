const fs = require("fs");
const { sanitize } = require("./sanitizer.js");
const { tokenize } = require("./tokenizer.js");

const filepaths = process.argv.slice(2);

if (filepaths.length == 0) {
	console.error("Must supply a .code file as a command-line argument.");
	return;
}

try {
	
	console.log(
		tokenize(
			sanitize(
				fs.readFileSync(filepaths[0], "utf8")
			)
		)
	);

} catch (err) {
	console.error("Error reading file:", err);
}