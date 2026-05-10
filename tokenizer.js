class Token {

	constructor(type = "", value = undefined) {
		this.type = type;
		this.value = value;
	}
}

module.exports = { tokenize: tokenize };

function tokenize(string) {

	let tokens = [];

	while (string.length != 0) {

		let match;

		// TODO arrayify this bish
		if (match = string.match(/^public|^private|^protected|^default/)) {

			tokens.push(new Token("access modifier", match[0]));
		
		} else if (match = string.match(/^class|^enum/)) {

			tokens.push(new Token("classdef", match[0]));

		} else if (match = string.match(/^{|^}|^=|^;/)) {

			tokens.push(new Token(match[0])); // a bunch of keywords whose appearance is their internal type

		} else if (match = string.match(/^boolean|^byte|^short|^int|^long|^float|^double|^char|^void/)) {

			tokens.push(new Token("primitive", match[0]));
		
		} else if (match = string.match(/^-?[0-9]+(\.[0-9]*)?/)) {

			tokens.push(new Token("number", match[0]));

		}else if (match = string.match(/^[A-Za-z_$][A-Za-z0-9_$]*/)) {

			tokens.push(new Token("name", match[0])); // variable and type names

		} else {

			string = ""; // give up
		}

		if (match)
			string = string.substring(match[0].length).trim();
	}

	return tokens;
}