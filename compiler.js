const fs = require("fs");
const { sanitize } = require("./sanitizer.js");
const { tokenize } = require("./tokenizer.js");
const { parse } = require("./parser.js");

const filepaths = process.argv.slice(2);

if (filepaths.length == 0) {
	console.error("Format: " + process.argv[0].substring(process.argv[0].lastIndexOf("/") + 1) + " " + process.argv[1].substring(process.argv[1].lastIndexOf("/") + 1) + " yourprogram.code");
	return;
}

try {
	
	console.log(
		parse(
			tokenize(
				sanitize(
					fs.readFileSync(filepaths[0], "utf8")
				)
			)
		)
	);

} catch (err) {
	console.error("Error reading file:", err);
}