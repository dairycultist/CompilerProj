class Op { // Operator generalizes class, function, statement, and expression definitions because I'm crazy

	constructor(type = "NOP", args = [], next = undefined) {
		this.type = type;
		this.args = args;
		this.next = next;
	}

	print(prefix = "") {

		if (this.args.length != 0) {

			console.log(prefix + "[" + this.type + "]:");

			for (let arg of this.args)
				arg.print(prefix + "  ");

		} else {
			console.log(prefix + this.type);
		}
	}
}

new Op("=", [new Op("x"), new Op("+", [new Op("5"), new Op("10")])]).print();