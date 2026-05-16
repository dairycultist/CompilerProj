module.exports = { parse: parse };

function parse(tokens) { // should return a dictionary of Blocks, with keys being either function names or "INTERNAL_toplevel" for the top level

	return new Block([
		new Statement("assign", [new Expression("variable:x"), new Expression("number:5")]),
		new Statement("assign", [new Expression("variable:x"), new Expression("add", [new Expression("variable:x"), new Expression("number:1")])]),
		new Block([
			new Expression("functioncall:print", [new Expression("variable:x")]),
		])
	]);
}

function parse_block(tokens) { // returns [Block, remaining_tokens]

}

function parse_statement(tokens) { // returns [Statement, remaining_tokens]

}

function parse_expression(tokens) { // returns [Expression, remaining_tokens]

}

////////////////////////////////////////////////////////////////////////////////////////////////

class Block { // a list of Blocks, Statements, and Expressions

	constructor(interior = []) {

		this.interior = interior;
	}

	toString(prefix = "") {

		let construct = "";

		for (const element of this.interior) {

			if (element instanceof Statement || element instanceof Expression) {
				construct += prefix + element.toString() + "\n";
			} else if (element instanceof Block) {
				construct += element.toString(prefix + "  ");
			}
		}

		return construct;
	}
}

class Statement { // does stuff with Expressions as parameters

	constructor(type = "", expressions = []) {

		this.type = type;
		this.expressions = expressions;
	}

	toString() {

		let construct = "[" + this.type + "]:";

		for (const expression of this.expressions) {

			construct += " " + expression.toString();
		}

		return construct;
	}
}

class Expression { // an expression that potentially has more Expressions inside it

	constructor(type = "", expressions = []) {

		this.type = type;
		this.expressions = expressions;
	}
	
	toString() {

		let construct = "(" + this.type;

		for (const expression of this.expressions) {

			construct += " " + expression.toString();
		}

		return construct + ")";
	}
}