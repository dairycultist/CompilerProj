module.exports = { sanitize: sanitize };

function sanitize(string) {

	// remove comments
	string = string.replaceAll(new RegExp("\/\/[^\n]*\n?$", "gm"), "");
	string = string.replaceAll(new RegExp("\/\\*.*?\\*\/", "gs"), "");

	// convert all sequences of whitespace-type characters into a single space for convenience
	string = string.replaceAll(/\s+/g, " ");

	// trim
	string = string.trim();

	return string;
}