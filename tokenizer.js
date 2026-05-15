module.exports = { tokenize: tokenize };

class Token {

	constructor(type = "", value = undefined) {
		this.type = type;
		this.value = value;
	}
}

const token_types = [
	{ typename: "binary operation", regex: "\\+|-|\\*|/" },
	{ typename: "assignment", regex: "=" },
	{ typename: "number", regex: "-?[0-9]+(\.[0-9]*)?" },
	{ typename: "variable", regex: "\\$[A-Za-z_$][A-Za-z0-9_$]*" },
	{ typename: "function", regex: "\\![A-Za-z_$][A-Za-z0-9_$]*" },
	{ typename: "statement terminator", regex: ";" },
	{ typename: "open parenthesis", regex: "\\(" },
	{ typename: "close parenthesis", regex: "\\)" },
];

function tokenize(string) {

	let tokens = [];

	while (string.length != 0) {

		let match;

		for (const token_type of token_types) {

			match = string.match(new RegExp("^(" + token_type.regex + ")"));

			if (match) {

				tokens.push(new Token(token_type.typename, match[0]));
				break;
			}
		}

		if (match) {

			// succeeded in tokenizing 1 token
			string = string.substring(match[0].length).trim();

		} else {

			// failed to tokenize 1 token
			console.log("\x1b[31mUnknown token error: \x1b[0m\n\t" + string.substring(0, Math.min(string.length, 20)));
			process.exit(1);
		}
	}

	return tokens;
}