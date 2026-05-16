module.exports = { tokenize: tokenize };

class Token {

	constructor(type = "", value = undefined) {
		this.type = type;
		this.value = value;
	}
}

const token_types = [
	{ typename: "operators", regex: "\\+|-|\\*|/|and|or|not" },
	{ typename: "assignment", regex: "=" },
	{ typename: "number", regex: "-?[0-9]+(\.[0-9]*)?" },
	{ typename: "string", regex: "\"[^\"]*\"" },
	{ typename: "variable name", regex: "\\$[A-Za-z_$][A-Za-z0-9_$]*" },
	{ typename: "function name", regex: "\\![A-Za-z_$][A-Za-z0-9_$]*" },
	{ typename: "if", regex: "if" },
	{ typename: "elif", regex: "elif" },
	{ typename: "else", regex: "else" },
	{ typename: "statement terminator", regex: ";" },
	{ typename: "open parenthesis", regex: "\\(" },
	{ typename: "close parenthesis", regex: "\\)" },
	{ typename: "open bracket", regex: "\\{" },
	{ typename: "close bracket", regex: "\\}" },
	{ typename: "function definer", regex: "define" },
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
			throw new Error("Unknown token error:\n\t" + string.substring(0, Math.min(string.length, 40)) + "...\n\t^ here");
		}
	}

	return tokens;
}