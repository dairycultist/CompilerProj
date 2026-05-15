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

console.log(
	new Block([
		new Statement("assign", [new Expression("variable"), new Expression("number")]),
		new Statement("assign", [new Expression("variable"), new Expression("add", [new Expression("variable"), new Expression("number")])]),
		new Block([
			new Expression("function call", [new Expression("variable"), new Expression("variable")]),
		])
	])
.toString());